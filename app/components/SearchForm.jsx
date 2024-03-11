import Results from "../components/Results";
import { Form } from '@remix-run/react'

const SearchForm = ({searchRef, docs}) => {
    return (<div className="searchContainer">
        <Form
            fetcherKey="search"
            name="search"
            className="searchForm"
            action="/search"
            navigate={false}
            ref={searchRef}
        >
            <input
                type="text"
                name="term"
                id="search"
                aria-label="Search"
                className="input"
            />

            <button type="submit">Search</button>
        </Form>
        <Results {...{ docs }} />
    </div>)
}

export default SearchForm;