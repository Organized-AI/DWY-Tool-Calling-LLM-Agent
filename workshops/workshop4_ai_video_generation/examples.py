"""
Texel AI API Examples

This file contains various examples of how to use the Texel AI API for hackathons
and rapid prototyping.
"""

import os

from texel_api import TexelAPI, TexelAPIError


def main():
    # Get API key from environment variable or prompt user
    api_key = os.getenv("TEXEL_API_KEY")
    if not api_key:
        api_key = input("Enter your Texel API key: ").strip()
        if not api_key:
            print("API key is required!")
            return

    # Initialize the client
    client = TexelAPI(api_key)

    print("🚀 Texel AI API Examples\n")

    # Example 1: Basic Image Generation
    print("📸 Example 1: Basic Image Generation")
    try:
        result = client.generate_image(
            prompt="A futuristic city with flying cars at sunset",
            model="Realistic",
            width=832,
            height=1040,
        )

        if result["images"]:
            client.download_image(result["images"][0], "example1_city.jpg")
            print("✅ Generated and saved: example1_city.jpg")

    except TexelAPIError as e:
        print(f"❌ Error: {e.message}")

    # Example 2: Multiple Images with Different Settings
    print("\n📸 Example 2: Multiple Images with High Quality")
    try:
        result = client.generate_image(
            prompt="A magical forest with glowing mushrooms",
            model="Anime",
            negative_prompt="blurry, low quality, dark",
            num_images=2,
            steps=40,  # Higher quality
            cfg_scale=10.0,
            seed=12345,  # Reproducible results
        )

        for i, image in enumerate(result["images"]):
            client.download_image(image, f"example2_forest_{i + 1}.jpg")

        print(f"✅ Generated and saved {len(result['images'])} images")

    except TexelAPIError as e:
        print(f"❌ Error: {e.message}")

    # Example 3: Image-to-Image Generation
    print("\n🖼️ Example 3: Image-to-Image Generation")
    # First, create a base image if we don't have one
    try:
        # Generate a base image first
        base_result = client.generate_image(prompt="A simple landscape with mountains", width=512, height=512)

        if base_result["images"]:
            client.download_image(base_result["images"][0], "base_landscape.jpg")

        # Now transform it
        transform_result = client.generate_image(
            prompt="The same landscape but in cyberpunk style with neon lights",
            init_image_path="base_landscape.jpg",
            cfg_scale=15.0,
            steps=30,
            width=512,
            height=512,
        )

        if transform_result["images"]:
            client.download_image(transform_result["images"][0], "example3_cyberpunk_landscape.jpg")
            print("✅ Generated and saved: example3_cyberpunk_landscape.jpg")

    except TexelAPIError as e:
        print(f"❌ Error: {e.message}")

    # Example 4: Video Generation
    print("\n🎬 Example 4: Text-to-Video Generation")
    # Tip: put a short prompt through an LLM to get a detailed one for better results.
    # The prompt below was created from:
    # A robot dancing in a futuristic nightclub with colorful lights
    try:
        video_result = client.generate_video(
            prompt="A sleek, humanoid robot with polished chrome plating and glowing blue accents dances energetically at the center of a vibrant, futuristic nightclub. The scene is set in a sprawling, high-tech venue with glass floors, holographic projections, and pulsating LED panels covering the walls and ceiling. Colorful laser beams sweep through the smoky air, synchronized with deep electronic music that reverberates through the space. The robot moves fluidly and rhythmically, executing complex dance moves with mechanical precision and surprising grace—spins, waves, and popping motions. In the background, a crowd of humans and other robots cheer and dance, lit by shifting neon hues of magenta, cyan, and lime green. A hovering camera circles slowly around the robot, occasionally cutting to wide-angle shots showing the club’s towering architecture and animated digital billboards. The overall vibe is electric, stylish, and immersive, blending cyberpunk and rave aesthetics with cinematic lighting and dynamic motion.",
            model="ltxv",  # only ltxv supports text to video on Texel right now
            width=360,
            height=640,
        )

        print(f"🎬 Started video generation, job ID: {video_result['job_id']}")
        print("⏳ Waiting for video to complete (this may take a few minutes)...")

        # Wait for completion with progress updates
        import time

        while True:
            status = client.check_video_status(video_result["job_id"], video_result["model_type"])
            print(f"   Progress: {status['progress']}% - Status: {status['status']}")

            if status["completed"]:
                if status["video_urls"]:
                    client.download_video(status["video_urls"][0], "example4_robot_dance.mp4")
                    print("✅ Generated and saved: example4_robot_dance.mp4")
                break
            elif status["failed"]:
                print(f"❌ Video generation failed: {status['error_message']}")
                break

            time.sleep(10)  # Check every 10 seconds

    except TexelAPIError as e:
        print(f"❌ Error: {e.message}")

    # Example 5: Image-to-Video Generation
    print("\n🎬 Example 5: Image-to-Video Generation")
    try:
        # Use the landscape image we created earlier
        if os.path.exists("base_landscape.jpg"):
            video_result = client.generate_video_from_image(
                prompt="The landscape comes alive with moving clouds and swaying trees",
                image_path="base_landscape.jpg",
                model="framepack",
                width=720,
                height=720,
            )

            print(f"🎬 Started image-to-video generation, job ID: {video_result['job_id']}")

            # Use the convenience method to wait for completion
            final_result = client.wait_for_video(
                video_result["job_id"],
                video_result["model_type"],
                timeout=600,  # 10 minutes max
                poll_interval=15,  # Check every 15 seconds
            )

            if final_result["completed"]:
                if final_result["video_urls"]:
                    client.download_video(final_result["video_urls"][0], "example5_landscape_video.mp4")
                    print("✅ Generated and saved: example5_landscape_video.mp4")
            else:
                print(f"❌ Video generation failed: {final_result['error_message']}")
        else:
            print("⚠️ Skipping image-to-video example (no base image found)")

    except TexelAPIError as e:
        print(f"❌ Error: {e.message}")

    # Example 6: Batch Processing with Different Models
    print("\n🔄 Example 6: Batch Processing with Different Models")
    prompts = [
        "A steampunk airship flying through clouds",
        "A dragon made of crystal in a cave",
        "A retro-futuristic car on a neon highway",
    ]

    models = ["Realistic", "Anime", "Realistic"]

    for i, (prompt, model) in enumerate(zip(prompts, models, strict=False)):
        try:
            print(f"   Generating image {i + 1}/3 with {model}...")
            result = client.generate_image(
                prompt=prompt,
                model=model,
                steps=20,  # Fast generation
                cfg_scale=7.0,
            )

            if result["images"]:
                client.download_image(result["images"][0], f"example6_batch_{i + 1}.jpg")
                print(f"   ✅ Saved: example6_batch_{i + 1}.jpg")

        except TexelAPIError as e:
            print(f"   ❌ Error with {model}: {e.message}")

    print("\n🎉 Examples completed! Check the generated files.")
    print("\n💡 Tips for hackathons:")
    print("- Use smaller image sizes (512x512) for faster generation")
    print("- Use fewer steps (10-20) for quick iterations")
    print("- Use specific, detailed prompts for better results")
    print("- Video generation takes longer - plan accordingly")
    print("- Keep your API key secure and don't commit it to git!")


if __name__ == "__main__":
    main()
