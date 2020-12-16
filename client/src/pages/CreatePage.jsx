import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useAuth } from "../hooks/auth.hook";
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
  const history = useHistory();
  const auth = useAuth();
  const { request } = useHttp();
  const [link, setLink] = useState("");

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const generated = await request(
          "/api/links/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        console.log(generated);
        history.push(`/detail/${generated.link._id}`);
      } catch (e) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2 cp-col">
        <div className="input-field">
          <input
            placeholder="Insert link"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Insert link</label>
        </div>
      </div>
    </div>
  );
};
