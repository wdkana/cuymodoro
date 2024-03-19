import React from "react";
import { Form } from "react-router-dom";

function AddTaskForm() {
  return (
    <Form method="post" action="/apps">
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
