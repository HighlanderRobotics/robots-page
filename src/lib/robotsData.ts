import type { RobotData } from "./robotDataType";

export const robotsData: {[name: string]: RobotData } = {
    selkie: {
        name: "Selkie",
        seasonName: "Rapid React",
        nameScalePercent: 30,
        revealVideoURL: "https://www.youtube.com/watch?v=6aCMSIiznuQ",
        animationFrameCount: 160,
        metrics: [
            {
                top: "Over",
                big: "90%",
                bottom: "championship accuracy",
            },
            {
                big: "2nd",
                bottom: "smallest frame at worlds",
            },
            {
                top: "Over",
                big: "800",
                bottom: "cargo scored",
            },
        ],
        subassemblies: [
            {
                heading: "Drivetrain",
                body: "Our drivebase is a simplistic 24” square swerve drive made from 2” by 1” aluminum beams. This differs slightly from our design last year as we choose a smaller base for *more maneuverability* and less supporting beams to *cut down on weight*. The corners are held together by 1/8th inch aluminum gussets that are riveted into the base but also screw into the mk3 swerve modules with .3 inch bolts. Finally, we have a light bottom plate in which all our electronics are secured into.",
                position: "center",
            },
            {
                heading: "Shooter",
                body: "As the central mechanism of the robot, our shooter integrates both shooting and routing into one subassembly. Two independently controlled routing wheels take the balls from the intake and store them in our linear routing system. Using beam breaks and color sensors, we are able to control *two balls* and have *automatic ball rejection*. Once software auto-aim is locked on, we use a two wheel active shooter with an adjustable hood that allows the ball to have a *consistent shot from anywhere* while reducing spin.",
                position: "left",
                pokeIntoAnimationPercent: 30,
            },
            {
                heading: "Intake",
                body: "Our pneumatically deployed over-bumper intake features 2-inch compliant wheels and vector-mecanum indexing in order to pick up cargo *as fast as possible*. Polycarbonate material, used on arms and main plates, is *resistant to impacts* and flexes instead of cracking. The intake deploys on a non-parallel 4 bar via just 2 inches of piston stroke, making the deployment *extremely jam-resistant and fast*. Our intake is also balanced with surgical tubing to increase deploy speed and smoothness.",
                position: "right",
                pokeIntoAnimationPercent: 30,
            },
            {
                heading: "Climber",
                body: "The high bar climber, redesigned for Chezy Champs, consists of a telescoping mid-bar climb followed by a passive high bar extension. The mid-bar climb, powered by two of WCP’s Grey-T Telescoping arms, deploys using constant force springs with a single 30:1 geared falcon 500 to winch in the cable. After climbing the mid-bar, we deploy our second-stage arms. The passive second stage uses a torsion spring for the initial flip-up part with pistons for retainment during the match. After extending the flip-up arms, we disengage the mid-bar telescope allowing our robot to “drop” onto the high bar.",
                position: "right",
                pokeIntoAnimationPercent: 45,
            },
        ],
    },
    nessie: {
        nameScalePercent: 30,
        name: "Nessie",
        seasonName: "Infinite Recharge",
        animationFrameCount: 0,
        revealVideoURL: "",
        unfinished: true,
        metrics: [],
        subassemblies: [],
    },
    whirlpool: {
        nameScalePercent: 18,
        name: "Whirlpool",
        seasonName: "Infinite Recharge At Home",
        animationFrameCount: 0,
        revealVideoURL: "",
        unfinished: true,
        metrics: [],
        subassemblies: [],
    }
}