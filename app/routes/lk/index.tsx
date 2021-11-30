import React from "react";
import stylesUrl from "~/styles/lk.css";
import { Form, json, useActionData, redirect } from "remix";
import type { LinksFunction, ActionFunction } from "remix";
import { readPublicToken } from "~/api/auth.api";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const action: ActionFunction = async ({ request, context, params }) => {
  const formData = await request.formData();
  const amount = formData.get("amount");
  if (!amount) {
    return json({ error: "Укажите сумму" }, { status: 400 });
  }
  const publicToken = await readPublicToken(request);
  const PAYMENT_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:6333' : 'https://payment-t.netlify.app';
  const paymentUrl = `${PAYMENT_HOST}/4244?paidservice_id=4244&LS=100340011200&_SUM=${amount}&region_id=1022&ADDRESS=%D0%B3+%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D0%B7%D0%B0%D0%B2%D0%BE%D0%B4%D1%81%D0%BA%2C+%D0%BF%D1%80%D0%BE%D0%B5%D0%B7%D0%B4+%D0%A1%D0%BA%D0%B0%D0%BD%D0%B4%D0%B8%D0%BD%D0%B0%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%2C+%D0%B4.6%D0%B4%D0%BE%D0%B314080+%D0%BA%D0%B2.7&url=https%3A%2F%2Flk.karelia.tns-e.ru%2Flk-pay&pay=true&channel=2&lk=&jwt=${publicToken.data}`;
  return json({ data: paymentUrl }, 200);
};

export default function LKPage() {
  const actionData = useActionData();

  React.useEffect(() => {
    if (actionData?.data) {
      window.location.assign(actionData.data);
    }
  }, [actionData]);

  return (
    <section>
      <h1>Личный кабинет</h1>
      <Form method="post" className="form">
        <label htmlFor="amount">Сумма платежа</label>
        <input className="amount-input" type="tel" name="amount" id="amount" />
        <button type="submit" className="submit-button">
          Оплатить
        </button>
      </Form>
    </section>
  );
}
