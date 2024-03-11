import { NavLink, useNavigate, useSubmit } from "@remix-run/react";

const SearchResult = ({ doc }) => {
    const submit = useSubmit();
    const sendUpdate = () => {
        return submit(
            { productId: doc.id },
            {
                action: '/stats',
                method: 'post',
                navigate: false,
                encType: "application/json"
            })

    }

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <button
            onClick={() => sendUpdate(doc)}
            className={"navLinks"}
        >
            <div>
                <div>
                    {doc.content}
                </div>
                <div>
                    {doc.date.split("T")[0]}
                </div>
            </div>
        </button>
    );
}

const Results = ({ docs }) => {
    return docs && docs.length > 0 && (
        <div id="docsContainer">
            {docs.map((doc) => {
                return <SearchResult doc={doc} key={doc.id} />
            })}
        </div>
    )
}
export default Results;