import { NavLink } from '@remix-run/react'

const Daily = ({ story }) => {
    return (
        <NavLink className="dailyStory">
            <h4 className="m0 title">{story.cubeTitleEn}</h4>
            <p className="m0 date">
                {story.releaseTime.split("T")[0]}
            </p>
        </NavLink>
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