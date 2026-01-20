import { NavLink } from "react-router-dom";
import style from "./termsOfUsePage.module.scss";

export default function TermsOfUsePage() {
  return (
    <div className={style["terms-inner"]}>
      <NavLink to="/reg">
        <div className={style["terms-back"]}></div>
      </NavLink>
      <div className={style["terms-container"]}>
        <div className={style["terms-title"]}> Terms of Use </div>
        <div className={style["terms-subtitle"]}> 1. General Provisions</div>
        <p>
          1.1. These Terms of Use (hereinafter referred to as the “Agreement”)
          govern the relationship between the online coffee shop (hereinafter
          referred to as the “Company”) and the user of the website/application
          (hereinafter referred to as the “User”).
        </p>
        <p>
          1.2. Registration on the website and/or placing an order constitutes
          the User’s full and unconditional acceptance of the terms of this
          Agreement.
        </p>
        <p>
          1.3. The Company reserves the right to amend this Agreement without
          prior notice. The current version is always available on the website.
        </p>
        <div className={style["terms-subtitle"]}>
          2. Registration and Account
        </div>
        <p>
          2.1. To place orders, the User may register by providing accurate and
          up-to-date information.
        </p>
        <p>
          2.2. The User is responsible for maintaining the confidentiality of
          their account credentials and for all actions performed under their
          account.
        </p>
        <p>
          2.3. The Company reserves the right to suspend or delete an account in
          case of violation of this Agreement.
        </p>
        <div className={style["terms-subtitle"]}> 3. Orders and Payment</div>
        <p>
          3.1. The User may place orders through the website or application.{" "}
        </p>
        <p>
          3.2. All prices are displayed in the national currency and include
          applicable taxes unless stated otherwise.
        </p>
        <p>
          3.3. The Company reserves the right to refuse or cancel an order due
          to product unavailability, technical issues, or other objective
          reasons.
        </p>
        <p>
          3.4. Payment is made using the methods available on the website.
          terms, timeframes, and costs are specified during the checkout
          process.
        </p>
        <div className={style["terms-subtitle"]}>4. Delivery and Pickup</div>
        <p>
          4.1. Delivery terms, timeframes, and costs are specified during the
          checkout process.
        </p>
        <p>
          4.2. The Company is not liable for delays caused by circumstances
          beyond its control (force majeure, incorrect address provided by the
          User, etc.).
        </p>
        <div className={style["terms-subtitle"]}>
          5. Returns and Order Cancellation
        </div>
        <p>
          5.1. Food products of proper quality are not subject to return or
          exchange unless otherwise provided by applicable law.
        </p>
        <p>
          5.2. If defects in the product are identified, the User has the right
          to contact the Company’s customer support service.
        </p>
        <div className={style["terms-subtitle"]}>
          6. Rights and Obligations of the Parties
        </div>
        <p>
          The User agrees to:
          <ul>
            <li>provide accurate information;</li>
            <li> not use the website for unlawful purposes. </li>
          </ul>
        </p>
        <p>
          The Company agrees to:
          <ul>
            <li>process orders in good faith;</li>
            <li> ensure the protection of the User’s personal data. </li>
          </ul>
        </p>
        <div className={style["terms-subtitle"]}>7. Personal Data</div>
        <p>
          7.1. By registering, the User consents to the processing of their
          personal data for the purposes of order fulfillment and service
          provision.
        </p>
        <p>
          7.2. Personal data processing is carried out in accordance with the
          Privacy Policy.
        </p>
          <div className={style["terms-subtitle"]}>
          8. Limitation of Liability
        </div>
        <p>
          8.1. The Company shall not be liable for any potential damages arising
          from the use of the website, unless otherwise required by law.
        </p>
        <p> 8.2. The information on the website is provided “as is.” </p>
        <div className={style["terms-subtitle"]}> 9. Final Provisions</div>
        <p>
          9.1. Any disputes shall be resolved through negotiations, and if no
          agreement is reached, in accordance with applicable law.
        </p>
        <p>
          9.2. This Agreement enters into force from the moment the User
          registers.
        </p>
      </div>
    </div>
  );
}
