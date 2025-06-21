# Texel AI API - Python SDK

A simple, standalone Python SDK for the Texel AI API. Perfect for hackathons, rapid prototyping, and AI-powered applications.

## 🚀 Quick Start

### 1. Get Your API Key

1. Visit [https://texel.ai](https://texel.ai)
2. Sign up for an account
3. Generate an API key from your dashboard

### 2. Install Dependencies

```bash
pip install requests
```

### 3. Basic Usage

```python
from texel_api import TexelAPI

# Initialize the client
client = TexelAPI(api_key="your_api_key_here")

# Generate an image
result = client.generate_image("A beautiful sunset over mountains")

# Save the image
client.download_image(result['images'][0], "sunset.jpg")

# Generate a video
video_result = client.generate_video("A cat dancing in the rain")

# Wait for video completion and download
final_result = client.wait_for_video(video_result['job_id'], video_result['model_type'])
if final_result['completed']:
    client.download_video(final_result['video_urls'][0], "cat_dance.mp4")
```

## 📸 Image Generation

### Basic Text-to-Image

```python
result = client.generate_image(
    prompt="A futuristic city with flying cars",
    model="Realistic",
    width=832,
    height=1040,
    steps=20,
    cfg_scale=7.0
)
```

### Image-to-Image Generation

```python
result = client.generate_image(
    prompt="Transform this into a cyberpunk style",
    init_image_path="input_image.jpg",
    cfg_scale=15.0,
    steps=30
)
```

### Available Image Models

- `Realistic` (default) - Great for realistic images
- `Anime` - Excellent for anime/illustration style

## 🎬 Video Generation

### Text-to-Video

```python
result = client.generate_video(
    prompt="A robot dancing in a nightclub",
    model="ltxv",
    width=720,
    height=1280
)

# Videos are generated asynchronously
final_result = client.wait_for_video(result['job_id'], result['model_type'])
```

### Image-to-Video

```python
result = client.generate_video_from_image(
    prompt="The person starts walking forward",
    image_path="person_standing.jpg",
    model="framepack"
)
```

### Available Video Models

- `framepack` (default) - High-quality video generation
- `ltxv` - LTX Video model for cinematic results
- `wan` - WAN model for smooth motion
- `hunyuan` - Hunyuan video model

## 🛠️ API Reference

### TexelAPI Class

#### `__init__(api_key, base_url="https://api.prod.texel.ai")`

Initialize the client with your API key.

#### `generate_image(prompt, **kwargs)`

Generate images from text prompts.

**Parameters:**

- `prompt` (str): Text description of the image
- `model` (str): Model name (default: "juggernautXL_v8Rundiffusion")
- `negative_prompt` (str): What to avoid in the generation
- `width` (int): Image width in pixels (default: 832)
- `height` (int): Image height in pixels (default: 1040)
- `num_images` (int): Number of images to generate (1-4)
- `steps` (int): Inference steps (default: 20)
- `cfg_scale` (float): Prompt adherence (1-20, default: 7.0)
- `seed` (int): Random seed for reproducible results
- `init_image_path` (str): Path to initial image for img2img

#### `generate_video(prompt, **kwargs)`

Generate videos from text prompts.

**Parameters:**

- `prompt` (str): Text description of the video
- `model` (str): Video model name (default: "framepack")
- `negative_prompt` (str): What to avoid
- `width` (int): Video width (default: 720)
- `height` (int): Video height (default: 1280)
- `frames` (int): Number of frames (default: 81)
- `steps` (int): Inference steps (default: 30)
- `cfg_scale` (float): Prompt adherence (default: 3.0)
- `seed` (int): Random seed
- `init_image_path` (str): Path to initial image for img2vid

#### `generate_video_from_image(prompt, image_path, **kwargs)`

Convenience method for image-to-video generation.

#### `check_video_status(job_id, model_type)`

Check the status of a video generation job.

#### `wait_for_video(job_id, model_type, timeout=300, poll_interval=5)`

Wait for a video generation job to complete.

#### `download_image(image_base64, save_path)`

Save a base64 encoded image to a file.

#### `download_video(video_url, save_path)`

Download a video from a signed URL.

### Convenience Functions

```python
from texel_api import generate_image, generate_video, generate_video_from_image

# Quick image generation
result = generate_image("your_api_key", "A beautiful landscape")

# Quick video generation
result = generate_video("your_api_key", "A flowing river")

# Quick image-to-video
result = generate_video_from_image("your_api_key", "Waves crashing", "beach.jpg")
```

## 🎯 Hackathon Tips

### Performance Optimization

```python
# For faster iterations during development
result = client.generate_image(
    prompt="Your prompt here",
    width=512,      # Smaller size = faster
    height=512,
    steps=10,       # Fewer steps = faster
    cfg_scale=7.0   # Lower values = faster
)
```

### Cost-Effective Usage

- Use smaller image dimensions for prototyping
- Use fewer inference steps for quick iterations
- Generate multiple variations with different seeds to find the best result

### Error Handling

```python
from texel_api import TexelAPI, TexelAPIError

try:
    result = client.generate_image("Your prompt")
except TexelAPIError as e:
    print(f"API Error: {e.message}")
    if e.status_code:
        print(f"Status Code: {e.status_code}")
```

### Environment Variables

Set your API key as an environment variable for security:

```bash
export TEXEL_API_KEY="your_api_key_here"
```

```python
import os
api_key = os.getenv("TEXEL_API_KEY")
client = TexelAPI(api_key)
```

## 📝 Examples

Run the examples file to see the SDK in action:

```bash
python examples.py
```

The examples include:

1. Basic image generation
2. Multiple images with high quality settings
3. Image-to-image transformation
4. Text-to-video generation
5. Image-to-video generation
6. Batch processing with different models

## 🔧 Advanced Usage

### Custom Video Dimensions

```python
# Portrait video for social media
result = client.generate_video(
    prompt="A person dancing",
    width=720,
    height=1280,  # 9:16 aspect ratio
    model="framepack"
)

# Landscape video
result = client.generate_video(
    prompt="A car driving through a tunnel",
    width=1280,
    height=720,   # 16:9 aspect ratio
    model="framepack"
)
```

### Reproducible Results

```python
# Use the same seed for consistent results
seed = 12345
result1 = client.generate_image("A cat", seed=seed)
result2 = client.generate_image("A cat", seed=seed)
# Both images will be very similar
```

### Batch Processing

```python
prompts = ["A cat", "A dog", "A bird"]
results = []

for prompt in prompts:
    result = client.generate_image(prompt, steps=10)  # Fast generation
    results.append(result)
```

## ⚠️ Important Notes

- **API Key Security**: Never commit your API key to version control
- **Rate Limits**: Be mindful of API rate limits during development
- **Video Generation**: Videos take significantly longer than images (2-10 minutes)
- **Async Operations**: Video generation is asynchronous - always check status
- **File Formats**: Images are returned as base64 JPEG, videos as MP4 URLs

## 🆘 Troubleshooting

### Common Issues

1. **"Invalid API Key"**

   - Verify your API key is correct
   - Check that it hasn't expired
   - Ensure you're using the correct base URL

2. **"Timeout Error"**

   - Video generation can take several minutes
   - Increase the timeout parameter in `wait_for_video()`
   - Check your internet connection

3. **"File Not Found"**

   - Verify image paths are correct for image-to-image/video generation
   - Use absolute paths when in doubt

4. **"Model Not Found"**
   - Check the model name spelling
   - Refer to the available models list above

## 📞 Support

- For API issues: Check the [Texel AI documentation](https://texel.ai/api_docs)
- For SDK issues: Review the examples and this README
- For hackathon support: Keep this README handy for quick reference

## 📜 License

This SDK is provided as-is for educational and development purposes. Please respect the Texel AI Terms of Service when using the API.

---

Happy hacking! 🚀
