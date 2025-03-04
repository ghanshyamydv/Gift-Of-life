import React from "react";

function Benefits() {
  return (
    <div>
      <h1>Benefits of living donation</h1>
      <ul>
        <li className="u-list">As a living donor, you can choose who receives your organ.</li>
        <li className="u-list">You can reduce someone’s waiting time for an organ transplant.</li>
        <li className="u-list">
          Living kidney donation can prevent—or shorten—the need for kidney
          dialysis.
        </li>
        <li className="u-list">
          Research has shown that recipients of organs from living donors have
          better outcomes than those who receive organs from deceased donors.
        </li>
      </ul>
      <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <iframe
        width="70%"
        height="415"
        src="https://www.youtube.com/embed/3e2phYzHJOI?si=PXLfLD7f_VvuaPiE"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      </div>
    </div>
  );
}

export default Benefits;
