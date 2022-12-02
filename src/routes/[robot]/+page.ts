import { error } from "@sveltejs/kit";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { robotsData } from "$lib/robotsData";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
    const robotData = robotsData[params.robot];

    if (robotData) {
        if (robotData.unfinished) throw error(404, 'Not found');

        return {
            robotData: robotData,
            robotPath: params.robot,
        }
    }

    throw error(404, 'Not found');
}