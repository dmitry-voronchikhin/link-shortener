import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";

export const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState("");
  const linkId = useParams().id;

  const fetchLink = useCallback(async () => {
    try {
      const data = await request(`/api/links/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLink(data);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    fetchLink();
  }, [fetchLink]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && link && <LinkCard link={link} />}</>;
};
