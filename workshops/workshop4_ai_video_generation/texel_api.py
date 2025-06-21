
"""
Texel AI API Python SDK

A simple, standalone Python SDK for interacting with the Texel AI API.
Perfect for hackathons and quick prototyping.

Usage:
    from texel_api import TexelAPI

    # Initialize with your API key
    client = TexelAPI(api_key="your_api_key_here")

    # Generate an image
    result = client.generate_image("A beautiful sunset over mountains")

    # Generate a video
    result = client.generate_video("A cat dancing in the rain")

    # Generate video from image
    result = client.generate_video_from_image("A person walking", "path/to/image.jpg")
"""

import base64
import random
import time
from pathlib import Path
from typing import Any

import requests


class TexelAPIError(Exception):
    """Custom exception for Texel API errors"""

    def __init__(self, message: str, status_code: None):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class TexelAPI:
    """
    Texel AI API Client

    A simple Python client for generating images and videos using the Texel AI API.
    """

    def __init__(self, api_key: str, base_url: str = "https://api.prod.texel.ai/v1"):
        """
        Initialize the Texel API client

        Args:
            api_key: Your Texel API key (get one from https://texel.ai)
            base_url: The base URL for the Texel API (default: https://api.prod.texel.ai/v1)
        """
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.session = requests.Session()
        self.session.headers.update(
            {
                "Authorization": f"Bearer {api_key}",
                "accept": "application/json",
                "Content-Type": "application/json",
            }
        )

    def _image_to_base64(self, image_path: Path) -> str:
        """Convert an image file to base64 string"""
        try:
            with open(image_path, "rb") as f:
                image_data = f.read()
            return base64.b64encode(image_data).decode("utf-8")
        except Exception as e:
            raise TexelAPIError(f"Error reading image file {image_path}: {e}")

    def _make_request(self, endpoint: str, payload: dict[str, Any] = None, method: str = "POST") -> dict[str, Any]:
        """Make a request to the Texel API"""
        url = f"{self.base_url}{endpoint}"

        try:
            if method.upper() == "GET":
                response = self.session.get(url)
            else:
                # For debugging requests
                # with open('request.json', 'w') as f:
                #     json.dump(payload, f)
                response = self.session.post(url, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            if hasattr(e, "response") and e.response is not None:
                try:
                    error_data = e.response.json()
                    error_message = error_data.get("error", str(e))
                except:
                    error_message = str(e)
                raise TexelAPIError(error_message, e.response.status_code)
            else:
                raise TexelAPIError(str(e))

    def generate_image(
        self,
        prompt: str,
        model: str = "Realistic",
        negative_prompt: str = "",
        width: int = 832,
        height: int = 1216,
        num_images: int = 1,
        steps: int = 20,
        cfg_scale: float = 7.0,
        seed: int = None,
        init_image_path: str = None,
    ) -> dict[str, Any]:
        """
        Generate images using text prompts

        Args:
            prompt: Text description of the image to generate
            model: Model to use for generation (default: Realistic)
            negative_prompt: What to avoid in the generation
            width: Image width in pixels
            height: Image height in pixels
            num_images: Number of images to generate (1-4)
            steps: Number of inference steps (more = higher quality, slower)
            cfg_scale: How closely to follow the prompt (1-20)
            seed: Random seed for reproducible results
            init_image_path: Path to initial image for img2img generation

        Returns:
            Dictionary containing generated image data
        """
        # Model mapping
        model_mapping = {
            "Realistic": "juggernautXL_v8Rundiffusion.safetensors",
            "Anime": "animagine-xl-3.1.safetensors",
        }

        model_name = model_mapping.get(model, model)

        # Process init image if provided
        init_image_base64 = None
        if init_image_path:
            init_image_base64 = self._image_to_base64(init_image_path)

        # Generate random seed if not provided
        if seed is None:
            seed = random.randint(1, 2147483647)

        # Build payload
        payload = {
            "model": {
                "name": model_name,
                "type": "SDXL",
            },
            "request": {
                "cfg_scale": cfg_scale,
                "denoising_strength": 0.75,
                "steps": steps,
                "width": width,
                "height": height,
                "negative_prompt": negative_prompt,
                "prompt": prompt,
                "seed": seed,
            },
            "params": {},
            "timeout": 120,
            "callback": {"url": ""},
        }

        # Add init image if provided
        if init_image_base64:
            payload["request"]["init_images"] = [init_image_base64]

        # Choose endpoint based on whether we have an init image
        endpoint = "/sd_server/img2img" if init_image_base64 else "/sd_server/txt2img"

        # Make multiple requests for multiple images
        all_images = []
        for i in range(num_images):
            # Use different seed for each image
            payload["request"]["seed"] = seed + i

            result = self._make_request(endpoint, payload)

            if "images" in result:
                all_images.extend(result["images"])

        return {
            "success": True,
            "images": all_images,
            "job_id": result.get("id"),
            "model_used": model,
            "prompt": prompt,
            "seed": seed,
        }

    def generate_video(
        self,
        prompt: str,
        model: str = "framepack",
        negative_prompt: str = "",
        width: int = 640,
        height: int = 480,
        frames: int = 81,
        steps: int = 30,
        cfg_scale: float = 3.0,
        seed: int = None,
        init_image_path: str = None,
    ) -> dict[str, Any]:
        """
        Generate videos using text prompts (and optionally an initial image)

        Args:
            prompt: Text description of the video to generate
            model: Video model to use (framepack, ltxv, wan, hunyuan)
            negative_prompt: What to avoid in the generation
            width: Video width in pixels
            height: Video height in pixels
            frames: Number of frames to generate
            steps: Number of inference steps
            cfg_scale: How closely to follow the prompt
            seed: Random seed for reproducible results
            init_image_path: Path to initial image for image-to-video generation

        Returns:
            Dictionary containing job information for async video generation
        """
        # Video model configurations
        # I2V means image to video only, T2V means text to video only, LTXV can do both.
        video_models = {
            "framepack": {"name": "FramePackI2V_HY_fp8_e4m3fn", "type": "FRAMEPACK_VIDEO"},
            "ltxv": {"name": "ltxv-13b-0.9.7-dev-fp8", "type": "LTX_VIDEO"},
            "wan": {"name": "wan2.1_t2v_14B_fp8_scaled", "type": "WAN_VIDEO"},
            "hunyuan": {"name": "hunyuan_video_t2v_720p_bf16", "type": "HUNYUAN_VIDEO"},
        }

        if model not in video_models:
            raise TexelAPIError(f"Unknown video model: {model}. Available models: {list(video_models.keys())}")

        model_config = video_models[model]

        # Process init image if provided
        init_image_base64 = None
        if init_image_path:
            init_image_base64 = self._image_to_base64(init_image_path)

        # Generate random seed if not provided
        if seed is None:
            seed = random.randint(1, 2147483647)

        # Build payload based on model
        if model == "framepack":
            payload = {
                "model": {"name": model_config["name"], "type": model_config["type"], "params": {}},
                "request": {
                    "cfg_scale": cfg_scale,
                    "steps": steps,
                    "width": width,
                    "height": height,
                    "length": 1.0,  # This can be changed to a larger number (seconds), which takes longer to generate
                    "prompt": prompt,
                    "video_codec": "video/h264-mp4",
                    "seed": seed,
                },
            }

            if init_image_base64:
                payload["request"]["init_images"] = [init_image_base64]

        elif model == "ltxv":
            payload = {
                "model": {"name": model_config["name"], "type": model_config["type"]},
                "request": {
                    "width": 360,
                    "height": 640,
                    "frames": 97,
                    "seed": seed,
                    "profile": "13b Dynamic",
                    "prompt": prompt,
                    "video_codec": "video/h264-mp4",
                    "negative_prompt": negative_prompt,
                },
            }

            if init_image_base64:
                payload["request"]["init_images"] = [init_image_base64]

        elif model == "wan":
            # Update model name for img2vid if input image provided
            model_name = "wan2.1_i2v_480p_14B_fp8_scaled" if init_image_base64 else model_config["name"]

            payload = {
                "model": {"name": model_name, "type": model_config["type"], "params": {}},
                "request": {
                    "cfg_scale": 6.0,
                    "steps": steps,
                    "width": width,
                    "height": height,
                    "frames": frames,
                    "prompt": prompt,
                    "video_codec": "video/h264-mp4",
                    "seed": seed,
                },
            }

            if init_image_base64:
                payload["request"]["init_images"] = [init_image_base64]
            else:
                payload["request"]["negative_prompt"] = negative_prompt

        else:  # hunyuan and other generic models
            payload = {
                "model": {"name": model_config["name"], "type": model_config["type"]},
                "request": {
                    "width": width,
                    "height": height,
                    "frames": frames,
                    "prompt": prompt,
                    "video_codec": "video/h264-mp4",
                    "negative_prompt": negative_prompt,
                    "seed": seed,
                },
            }

            if init_image_base64:
                payload["request"]["init_images"] = [init_image_base64]

        # Choose endpoint based on whether we have an init image
        endpoint = "/sd_server/img2vid" if init_image_base64 else "/sd_server/txt2vid"

        result = self._make_request(endpoint, payload)

        return {
            "success": True,
            "job_id": result.get("id"),
            "model_used": model,
            "model_type": model_config["type"],
            "prompt": prompt,
            "seed": seed,
            "status": "processing",
        }

    def generate_video_from_image(
        self, prompt: str, image_path: str, model: str = "framepack", **kwargs
    ) -> dict[str, Any]:
        """
        Generate a video from an initial image

        Args:
            prompt: Text description of the video to generate
            image_path: Path to the initial image
            model: Video model to use
            **kwargs: Additional arguments passed to generate_video()

        Returns:
            Dictionary containing job information for async video generation
        """
        return self.generate_video(prompt=prompt, model=model, init_image_path=image_path, **kwargs)

    def check_video_status(self, job_id: str, model_type: str) -> dict[str, Any]:
        """
        Check the status of a video generation job

        Args:
            job_id: The job ID returned from generate_video()
            model_type: The model type (e.g., "FRAMEPACK_VIDEO", "LTX_VIDEO")

        Returns:
            Dictionary containing job status and results
        """
        endpoint = f"/sd_server/status/{job_id}/{model_type}"

        try:
            result = self._make_request(endpoint, method="GET")

            job_status = result.get("job_status", "")
            signed_urls = result.get("signed_output_urls", [])
            progress = result.get("progress", 0)
            error_message = result.get("error_message", "")

            return {
                "job_id": job_id,
                "status": job_status,
                "progress": progress,
                "video_urls": signed_urls,
                "error_message": error_message,
                "completed": job_status == "success" and signed_urls,
                "failed": job_status in ["failed", "error"] or bool(error_message),
            }
        except Exception as e:
            return {
                "job_id": job_id,
                "status": "error",
                "progress": 0,
                "video_urls": [],
                "error_message": str(e),
                "completed": False,
                "failed": True,
            }

    def wait_for_video(
        self, job_id: str, model_type: str, timeout: int = 300, poll_interval: int = 5
    ) -> dict[str, Any]:
        """
        Wait for a video generation job to complete

        Args:
            job_id: The job ID returned from generate_video()
            model_type: The model type
            timeout: Maximum time to wait in seconds
            poll_interval: How often to check status in seconds

        Returns:
            Dictionary containing final job status and results
        """
        start_time = time.time()

        while time.time() - start_time < timeout:
            status = self.check_video_status(job_id, model_type)

            if status["completed"] or status["failed"]:
                return status

            time.sleep(poll_interval)

        return {
            "job_id": job_id,
            "status": "timeout",
            "progress": 0,
            "video_urls": [],
            "error_message": f"Job timed out after {timeout} seconds",
            "completed": False,
            "failed": True,
        }

    def download_video(self, video_url: str, save_path: str) -> None:
        """
        Download a video from a signed URL

        Args:
            video_url: The signed URL from video generation results
            save_path: Where to save the downloaded video
        """
        try:
            response = requests.get(video_url, stream=True)
            response.raise_for_status()

            with open(save_path, "wb") as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)

        except Exception as e:
            raise TexelAPIError(f"Error downloading video: {e}")

    def download_image(self, image_base64: str, save_path: str) -> None:
        """
        Save a base64 encoded image to a file

        Args:
            image_base64: Base64 encoded image data
            save_path: Where to save the image
        """
        try:
            image_data = base64.b64decode(image_base64)
            with open(save_path, "wb") as f:
                f.write(image_data)
        except Exception as e:
            raise TexelAPIError(f"Error saving image: {e}")


# Convenience functions for quick usage
def generate_image(api_key: str, prompt: str, **kwargs) -> dict[str, Any]:
    """Quick function to generate an image"""
    client = TexelAPI(api_key)
    return client.generate_image(prompt, **kwargs)


def generate_video(api_key: str, prompt: str, **kwargs) -> dict[str, Any]:
    """Quick function to generate a video"""
    client = TexelAPI(api_key)
    return client.generate_video(prompt, **kwargs)


def generate_video_from_image(api_key: str, prompt: str, image_path: str, **kwargs) -> dict[str, Any]:
    """Quick function to generate a video from an image"""
    client = TexelAPI(api_key)
    return client.generate_video_from_image(prompt, image_path, **kwargs)

