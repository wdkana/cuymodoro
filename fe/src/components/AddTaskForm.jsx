import React, { useEffect } from "react";
import { Form, useActionData } from "react-router-dom";

function AddTaskForm() {
  const actionData = useActionData();

  useEffect(() => {
    console.log({ actionData });
  }, [actionData]);

  return (
    <Form method="post" action="/">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Fitur apa yang kamu kerjain"
          className="input input-bordered w-full rounded-md"
        />
        <select className="select select-bordered w-full" name="level">
          <option defaultValue={"reguler"}>Pilih Break Level</option>
          <option value={"newcomers"}>New Comers</option>
          <option value={"reguler"}>Reguler</option>
          <option value={"enthusiast"}>Enthusiast</option>
        </select>
        <button type="submit" className="btn btn-primary rounded-md">
          Mulai
        </button>
      </div>
    </Form>
  );
}

export default AddTaskForm;
