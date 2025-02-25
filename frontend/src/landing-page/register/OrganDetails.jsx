import React, { useState } from "react";

function OrganDetails({ setFieldValue, handleChange, values, handleBlur }) {
  const [organInfo, setOrganInfo] = useState(false);
  const [otherOrganTissue, setOtherOrganTissue] = useState(false);

  return (
    <div className="ps-4 pt-3">
      <h4>Which organs and tissue would you like to donate?</h4>
      <h5
        className="text-decoration-underline text-primary"
        style={{ textUnderlineOffset: "8px", cursor: "pointer" }}
        onClick={() => {
          setOrganInfo(!organInfo);
        }}
      >
        &#x2192; Find out more about organs and tissue before you decide
      </h5>
      {organInfo && (
        <div className="border-start border-dark ps-3">
          <h4 className="text-decoration-underline">Organs</h4>
          <h5>Heart</h5>
          <p>
            Blood being pumped around your body by your heart carries oxygen and
            nutrients. Without the heart, your body wouldn’t get oxygen. Your
            heart can be transplanted whole or in some cases the valves
            (pulmonary and aortic) can be transplanted.
          </p>
          <h5>Lungs</h5>
          <p>
            Your lungs supply oxygen to your blood and clear carboPon dioxide
            from your body. Without healthy lungs you couldn’t breathe properly.
          </p>
          <h5>Kidneys</h5>
          <p>
            Your kidneys filter wastes from your blood and convert them to
            urine. When your kidneys stop working you can develop kidney
            failure. Harmful wastes and fluids build up in your body and your
            blood pressure may rise. You can live healthily with one kidney.
          </p>
          <h5>Liver</h5>
          <p>
            Your liver produces bile to clean out your body. If your liver isn’t
            working right, you will begin to feel tired, experience nausea,
            vomiting, decreased appetite, brown urine, or even jaundice -
            yellowing in the whites of your eyes. Your liver can be transplanted
            whole or in some cases the cells (hepatocytes) can be transplanted.
          </p>

          <h5>Pancreas</h5>
          <p>
            Your pancreas is in your abdomen. It produces insulin to control
            your blood sugar levels. If your pancreas is not working correctly
            your blood sugar level rises, which can lead to diabetes. Your
            pancreas can be transplanted whole or in some cases the cells (islet
            cells) can be transplanted.
          </p>

          <h5>Small Intestine (bowel)</h5>
          <p>
            The small intestine (also small bowel) absorbs nutrients and
            minerals from food we eat. If your small intestine fails, you
            wouldn’t be able to digest food. You would need to get nutrition
            from an alternative method, such as through a drip into your vein.{" "}
          </p>
          <h4 className="text-decoration-underline">Tissues</h4>
          <h5>Tendons and ligaments</h5>
          <p>
            Tendons and ligaments are vital connective tissues in the body;
            tendons attach muscles to bones, while ligaments connect bones to
            other bones. They are often donated during surgical procedures, like
            joint replacements, and used in reconstructive surgeries to repair
            injuries, such as torn ACLs or damaged joints.
          </p>
          <h5>Corneas</h5>
          <p>
            The cornea lets light into your eyes, without them you wouldn’t be
            able to see. The gift of sight is precious. Every day 100 people in
            the UK start to lose their sight. Almost 2 million people in the UK
            are living with significant sight loss. Your donation can help
            someone regain their sight.
          </p>
          <h5>Amniotic Membrane</h5>
          <p>
            The amniotic membrane, a thin tissue layer from the placenta, is
            often donated by mothers after childbirth. Its regenerative
            properties make it valuable in wound healing, reconstructive
            surgeries, and eye treatments.
          </p>
          <h5>Bone marrow</h5>
          <p>
            Bone marrow, a soft tissue inside bones responsible for blood cell
            production, is another significant donation. It is used to treat
            conditions such as leukemia and other blood disorders, and it is
            extracted from the pelvic bone under anesthesia.
          </p>
          <h5>Bone </h5>
          <p>
            Bone tissue, removed during procedures like hip replacements, can
            also be donated. It is commonly used in grafting for orthopedic
            surgeries to repair fractures, address joint issues, or replace bone
            loss.
          </p>

          <h5>Skin</h5>
          <p>
            Skin is another valuable donation, especially for burn victims or
            patients requiring wound treatment and reconstructive surgeries.
            Thin layers of skin, usually taken from areas like the thighs or
            back, can regenerate and do not harm the donor.
          </p>
          <h5>Blood components</h5>
          <p>
            Blood components, such as red blood cells, white blood cells,
            plasma, and platelets, are regularly donated to treat conditions
            like anemia, clotting disorders, and blood loss due to trauma or
            surgery. Blood donations are quick and can be repeated frequently as
            the body replenishes these components.
          </p>
          <h5>Peripheral blood stem cells</h5>
          <p>
            Peripheral blood stem cells (PBSC), which are found in the
            bloodstream, are collected after stimulating their release from bone
            marrow using special medications. These stem cells are used to treat
            cancers and other blood disorders, offering a less invasive
            alternative to traditional bone marrow donation.
          </p>
        </div>
      )}
      <h4 className="mt-3">Organs a Living Donor Can Donate:</h4>
      <div className="ms-4">
        <input
          className="form-check-input border-dark"
          type="checkbox"
          name="organsAndTissues.selectedOrgans"
          id="heart"
          value="heart"
          onChange={handleChange}
          checked={values.organsAndTissues.selectedOrgans?.includes("heart")}
        />
        <label className="form-check-label" htmlFor="heart">
          Heart
        </label>
        <br />
        <input
          className="form-check-input border-dark"
          type="checkbox"
          name="organsAndTissues.selectedOrgans"
          id="lungs"
          value="lung"
          onChange={handleChange}
          checked={values.organsAndTissues.selectedOrgans?.includes("lung")}
        />
        <label className="form-check-label" htmlFor="lungs">
          Lung
        </label>
        <br />
        <input
          className="form-check-input border-dark"
          type="checkbox"
          id="kidneys"
          name="organsAndTissues.selectedOrgans"
          value="kidney"
          onChange={handleChange}
          checked={values.organsAndTissues.selectedOrgans?.includes("kidney")}
        />
        <label className="form-check-label" htmlFor="kidneys">
          Kidneys
        </label>
        <br />
        <input
          className="form-check-input border-dark"
          type="checkbox"
          id="liver"
          name="organsAndTissues.selectedOrgans"
          value="liver"
          onChange={handleChange}
          checked={values.organsAndTissues.selectedOrgans?.includes("liver")}
        />
        <label className="form-check-label" htmlFor="liver">
          Liver
        </label>
        <br />
        <input
          className="form-check-input border-dark"
          type="checkbox"
          id="pancreas"
          name="organsAndTissues.selectedOrgans"
          value="pancreas"
          onChange={handleChange}
          checked={values.organsAndTissues.selectedOrgans?.includes("pancreas")}
        />

        <label className="form-check-label" htmlFor="pancreas">
          Pancreas
        </label>
        <br />

        <input
          className="form-check-input border-dark"
          type="checkbox"
          id="small-intestine"
          name="organsAndTissues.selectedOrgans"
          value="small-intestine"
          onChange={handleChange}
          checked={values.organsAndTissues.selectedOrgans?.includes(
            "small-intestine"
          )}
        />
        <label className="form-check-label" htmlFor="small-intestine">
          Small Intestine (bowel)
        </label>
      </div>

      <p className="mt-3">Tissue a Living Recipient Can Donate:</p>
      <div className="ms-4">
        <input
          className="form-check-input border-dark"
          type="checkbox"
          id="tendons-ligaments"
          name="organsAndTissues.selectedOrgans"
          value="tendons-ligaments"
          onChange={handleChange}
          checked={values.organsAndTissues.selectedOrgans?.includes("pancreas")}
        />
        <label className="form-check-label" htmlFor="tendons-ligaments">
          Tendons and Ligaments
        </label>
        <br />
        <input
          className="form-check-input border-dark"
          type="checkbox"
          id="corneas"
          name="organsAndTissues.selectedOrgans"
          value="corneas"
          onChange={handleChange}
          checked={values.organsAndTissues.selectedOrgans?.includes("corneas")}
        />
        <label className="form-check-label" htmlFor="corneas">
          Corneas
        </label>
        <br />
        <input
          className="form-check-input border-dark"
          type="checkbox"
          id="amniotic-membrane"
          name="organsAndTissues.selectedOrgans"
          value="amniotic-membrane"
          onChange={handleChange}
          checked={values.organsAndTissues.selectedOrgans?.includes(
            "amniotic-membrane"
          )}
        />
        <label className="form-check-label" htmlFor="amniotic-membrane">
          Amniotic Membrane
        </label>
        <br />
        <input
          className="form-check-input border-dark"
          type="checkbox"
          id="bone-marrow"
          name="organsAndTissues.selectedOrgans"
          value="bone-marrow"
          onChange={handleChange}
          checked={values.organsAndTissues.selectedOrgans?.includes(
            "bone-marrow"
          )}
        />
        <label className="form-check-label" htmlFor="bone-marrow">
          Bone Marrow
        </label>
        <br />
        <input
          className="form-check-input border-dark"
          type="checkbox"
          id="bone"
          name="organsAndTissues.selectedOrgans"
          value="bone"
          onChange={handleChange}
          checked={values.organsAndTissues.selectedOrgans?.includes("bone")}
        />
        <label className="form-check-label" htmlFor="bone">
          Bone
        </label>
        <br />
        <input
          className="form-check-input border-dark"
          type="checkbox"
          id="skin"
          name="organsAndTissues.selectedOrgans"
          value="skin"
          onChange={handleChange}
          checked={values.organsAndTissues.selectedOrgans?.includes("skin")}
        />
        <label className="form-check-label" htmlFor="skin">
          Skin
        </label>
        <br />
        <input
          className="form-check-input border-dark"
          type="checkbox"
          id="blood-components"
          name="organsAndTissues.selectedOrgans"
          value="blood-components"
          onChange={handleChange}
          checked={values.organsAndTissues.selectedOrgans?.includes(
            "blood-components"
          )}
        />
        <label className="form-check-label" htmlFor="blood-components">
          Blood Components
        </label>
        <br />
        <input
          className="form-check-input border-dark"
          type="checkbox"
          id="blood-stem-cells"
          name="organsAndTissues.selectedOrgans"
          value="blood-stem-cells"
          onChange={handleChange}
          checked={values.organsAndTissues.selectedOrgans?.includes(
            "blood-stem-cells"
          )}
        />
        <label className="form-check-label" htmlFor="blood-stem-cells">
          Peripheral Blood Stem Cells
        </label>
        <br />
        <input
          className="form-check-input border-dark"
          type="checkbox"
          id="other-organ-tissue"
          onChange={() => {
            setOtherOrganTissue(!otherOrganTissue);
            setFieldValue("organsAndTissues.otherOrganTissue", "");
          }}
        />
        <label className="form-check-label" htmlFor="other-organ-tissue">
          Other Organ or Tissue (please specify)
        </label>
        {otherOrganTissue && (
          <input
            type="text"
            name="organsAndTissues.otherOrganTissue"
            value={values.organsAndTissues.otherOrganTissue}  // Bind value to Formik state
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
        
      </div>
    </div>
  );
}

export default OrganDetails;
