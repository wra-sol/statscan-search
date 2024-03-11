import generateEmbeddings from "../embed";

export const action = async ({ request }) => {
    const date = new Date();
    const today = date.toISOString().split("T")[0];
    const changed = await fetch(`https://www150.statcan.gc.ca/t1/wds/rest/getChangedCubeList/${today}`).then(res => res.json());

    const updates = await generateEmbeddings({ products: changed.object });
    return updates
}