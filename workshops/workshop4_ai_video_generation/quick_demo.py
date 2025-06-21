"""
Quick Demo of Texel AI API

A minimal example to get you started quickly.
Perfect for testing your API key and seeing the basic functionality.
"""

import os
import time

from texel_api import TexelAPI, TexelAPIError


def main():
    print("🚀 Texel AI Quick Demo\n")

    # Get API key
    api_key = os.getenv("TEXEL_API_KEY")
    if not api_key:
        api_key = input("Enter your Texel API key: ").strip()

    if not api_key:
        print("❌ API key is required!")
        return

    # Initialize client
    client = TexelAPI(api_key)

    # Quick image generation test
    print("📸 Testing image generation...")
    try:
        result = client.generate_image(
            prompt="A cute friendly robot looking at you, hands and arms visible",
            width=640,
            height=480,
            steps=20,
        )

        if result["images"]:
            client.download_image(result["images"][0], "robot.jpg")
            print("✅ Success! Generated and saved: robot.jpg")
            print(f"   Used model: {result['model_used']}")
            print(f"   Seed: {result['seed']}")
        else:
            print("❌ No images returned")

    except TexelAPIError as e:
        print(f"❌ Error: {e.message}")
        if e.status_code:
            print(f"   Status code: {e.status_code}")
        return

    # Optional video test (commented out by default since it takes longer)
    test_video = input("\n🎬 Test video generation too? (y/N): ").lower().strip()

    if test_video == "y":
        print("🎬 Testing video generation...")
        try:
            video_result = client.generate_video(
                prompt="The robot waves hello, simple animation",
                model="framepack",
                width=640,
                height=480,
                init_image_path="robot.jpg",
            )

            print("✅ Video generation started!")
            print(f"   Job ID: {video_result['job_id']}")
            print("   ⏳ Now checking status every 20 seconds...")

            while True:
                time.sleep(20)

                status = client.check_video_status(video_result["job_id"], video_result["model_type"])
                print(f"   Status: {status['status']} - Progress: {status['progress']}%")

                if status["completed"]:
                    if status["video_urls"]:
                        client.download_video(status["video_urls"][0], "hello_robot.mp4")
                        print("✅ Video completed and saved: hello_robot.mp4")
                    else:
                        print("❌ Video completed but no URLs returned")
                    break
                elif status["status"].lower() != "processing":
                    print(f"⚠️ Video job stopped with status: {status['status']}")
                    break

        except TexelAPIError as e:
            print(f"❌ Video error: {e.message}")

    print("\n🎉 Demo complete!")
    print("\n💡 Next steps:")
    print("   - Check out examples.py for more advanced usage")
    print("   - Read README.md for full documentation")
    print("   - Start building your hackathon project!")


if __name__ == "__main__":
    main()
