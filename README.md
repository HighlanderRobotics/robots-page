# Highlander Robotics Robots

This is the source code for [robots.frc8033.com](https://robots.frc8033.com/).

## Developing
### Prerequesites
1. [git](https://git-scm.com/) installed
1. [node and npm](https://nodejs.org/) installed

```bash
# Clone the repository
git clone https://github.com/HighlanderRobotics/robots-page.git
# Install dependencies
npm install
# Start the development server
npm run dev
```

### Structure
The files that will be edited most often are `src/lib/robotsData.ts`, which contains all of the names of the robots and information about them, and `static/assets/robots`, which contains all of the media for the individual robot pages. Within `static/assets/robots/<robot>`, you'll find the `animation` directory and `ending-background.jpg` file. `animation` contains all the frames of the rendered animation. `ending-background.jpg` will be shown at the end as a backdrop for the robot reveal button section.

### Publishing
Once everyone is satisfied with the changes, you can push to master, and it will automatically be deployed to production.

## Yearly checklist
- Make a short writeup for each subsystem and order them.
    - In today's world, people's attention spans are becoming increasinly shorter, and they often don't have time to read long paragraphs. Make it more engaging for them by making sure to...
    - Highlight the most important or impressive information \*in asterisks\*.
    - Use a friendly voice. Sound passionate and enthusiastic about it. You're not writing a technical paper. Don't be afraid to make puns.
    - Keep it concise. We have more detailed information for people want it.
- Make the animation
    - Each subsystem should have a keyframe in which it is emphasized. There should also be a keyframe at the beginning used as the main hero image for the robot.
    - There should be a consistent number of frames between each keyframe.
    - The animation should never intersect with any border of the frame other than the bottom.
    - The frame should have a square aspect ratio.
    - For reasonable loading times, a resolution of no more than 850 x 850 is recommended. The first frame can be larger as it is more prominently and frequently featured.
    - Render as a `.png` sequence where each file name is the frame number padded on the left by zeroes to be 4 digits long and ending in `.png`. For example, `0001.png`.
    - Put the rendered sequence in `static/assets/robots/[robot ID]/animation/`.
- Choose a wide photo of the robot, preferably at a tournament, for use as the ending background. Put it in `static/assets/robots/[robot ID]/` and name it `ending-background.jpg`.
- Put all the info in `src/lib/robotsData.ts`.

