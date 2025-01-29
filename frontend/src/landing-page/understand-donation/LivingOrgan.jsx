import React from 'react'

function LivingOrgan() {
  return (
    <>
      <h1 className="fw-bold">Living Organ Donation</h1>
      <div className="row fs-5">
        <p>
          You can donate a kidney, a piece of your liver, and certain other
          organs and tissues while alive. About 6,500 living donation
          transplants take place each year.
        </p>
        <p>
          Unlike deceased donors, a living donor can decide who to donate their
          organ to, helping a recipient get an organ transplant faster. Most
          living donations happen between family members or close friends. Other
          people choose to donate to someone they don't know. See stories of
          real people who have donated and received organs.
        </p>
        <p>
          Living donation is typically safe for the donor. Most living donors go
          on to live active, healthy lives and can see the positive impact of
          their donation.
        </p>
      </div>
      <div className="row custom-understand-page-bg d-flex justify-content-center align-items-center">
        <div className="col">
          <img src="./images/livng-donor-man.png" alt="donor-man-image" />
        </div>
        <div className="col">
          <p className="fs-3 fw-bold">
            While alive, you can donate one
            <span className="highlight-text">kidney</span>, part of your{" "}
            <span className="highlight-text">liver</span>, and certain other
            organs and tissues.
          </p>
        </div>
      </div>

      <div className="row custom-understand-page-bg d-flex justify-content-center align-items-center mt-5">
        <div className="col p-5">
          <p className="fs-5 fs-3 fw-bold">
          <span className="highlight-text">85%</span> of people on the organ transplant waiting list need a <span className="highlight-text">Kidney</span>.
          </p>
        </div>
        <div className="col">
          <img src="./images/donor-man-and-recipient-woman.png" alt="man-woman-image" />
        </div>
      </div>
    </>
  )
}

export default LivingOrgan
