import type { MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { MainHeader, UpdatedHeader } from "../components/Headers";
import Dailys from "../components/Daily";
import SearchForm from "../components/SearchForm";
import "../index.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Searchable StatsCan" },
    {
      name: "description",
      content: "StatsCan has a bad search feature. Try this one instead.",
    },
  ];
};
export const loader = async ({ request }) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  const { data: daily, error } = await supabase
    .from("statscan")
    .select()
    .order("releaseTime", { ascending: false })
    .limit(6);
  return { daily };
};

export default function Index() {
  const { data } = useFetcher({ key: "search" });
  const { daily } = useLoaderData();
  const [docs, setDocs] = useState();
  const searchRef = useRef();

  useEffect(() => {
    searchRef?.current.reset();
    setDocs(data?.docs);
  }, [data]);

  useEffect(() => {
    const handleHideDocs = (event) => {
      if (event.key === "Escape") {
        setDocs(null);
      }
    };

    const handleClickOutside = (event) => {
      const docsContainer = document.getElementById("docsContainer");
      if (docsContainer && !docsContainer.contains(event.target)) {
        setDocs(null);
      }
    };
    document.addEventListener("keydown", handleHideDocs);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleHideDocs);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="container">
      <MainHeader />
      <SearchForm {...{ searchRef, docs }} />
      <div>
        <UpdatedHeader />
        <Dailys stories={daily} />
      </div>
    </div>
  );
}
