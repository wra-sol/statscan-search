import { NavLink, useSubmit } from '@remix-run/react'

const Daily = ({ story }) => {
    const submit = useSubmit();
    const sendUpdate = () => {
        return submit(
            { productId: story.productId },
            {
                action: '/stats',
                method: 'post',
                navigate: false,
                encType: "application/json"
            })
    }
    return (
        <button className="dailyStory" onClick={(sendUpdate)}>
            <h4 className="m0 title">{story.cubeTitleEn}</h4>
            <p className="m0 date">
                {story.releaseTime.split("T")[0]}
            </p>
        </button>
    );
}


const Dailys = ({ stories }) => {
    return (
        <div className="dailyContainer">
            {stories &&
                stories.map((story) => {
                    return <Daily key={story.productId} {...{ story }} />
                })}
        </div>)
}

export default Dailys;