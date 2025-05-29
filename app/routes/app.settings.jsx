// import { useState } from "react";
// import { Page, Layout, FormLayout, TextField, Button, Checkbox, Card } from "@shopify/polaris";
// import { setConfig } from "~/lib/configStore";

// export default function SettingsPage() {
//   const [accessKey, setAccessKey] = useState("");
//   const [secretKey, setSecretKey] = useState("");
//   const [couriers, setCouriers] = useState({
//     sameday: false,
//     nextday: false,
//     regular: true,
//     cargo: false,
//   });

//   const handleSubmit = () => {
//   const newConfig = {
//     accessKey,
//     secretKey,
//     couriers,
//   };

//   // Save to global store
//   setConfig(newConfig);

//   console.log("Saving config:", newConfig);
//   alert("Configuration saved!");
// };

//   const handleCheckbox = (type) =>
//     setCouriers({ ...couriers, [type]: !couriers[type] });

//   return (
//     <Page title="Shipping Rate Settings">
//       <Layout>
//         <Layout.Section>
//           <Card sectioned>
//             <FormLayout>
//               <TextField
//                 label="Access Key"
//                 value={accessKey}
//                 onChange={setAccessKey}
//               />
//               <TextField
//                 label="Secret Key"
//                 value={secretKey}
//                 onChange={setSecretKey}
//                 type="password"
//               />
//               <Checkbox
//                 label="Same Day"
//                 checked={couriers.sameday}
//                 onChange={() => handleCheckbox("sameday")}
//               />
//               <Checkbox
//                 label="Next Day"
//                 checked={couriers.nextday}
//                 onChange={() => handleCheckbox("nextday")}
//               />
//               <Checkbox
//                 label="Regular"
//                 checked={couriers.regular}
//                 onChange={() => handleCheckbox("regular")}
//               />
//               <Checkbox
//                 label="Cargo"
//                 checked={couriers.cargo}
//                 onChange={() => handleCheckbox("cargo")}
//               />
//               <Button onClick={handleSubmit} primary>Save Settings</Button>
//             </FormLayout>
//           </Card>
//         </Layout.Section>
//       </Layout>
//     </Page>
//   );
// }

// import { json } from "@remix-run/node";
// import { useLoaderData, Form, useNavigation } from "@remix-run/react";
// import {
//   Page,
//   Layout,
//   TextField,
//   Button,
//   Checkbox,
//   Card,
//   FormLayout,
// } from "@shopify/polaris";
// import { useState, useEffect } from "react";
// import { saveConfig, getConfig } from "/app/lib/configStore"; // ✅ THIS LINE

// export const action = async ({ request }) => {
//   const formData = await request.formData();
//   const config = {
//     accessKey: formData.get("accessKey"),
//     secretKey: formData.get("secretKey"),
//     couriers: {
//       sameday: formData.get("sameday") === "on",
//       nextday: formData.get("nextday") === "on",
//       regular: formData.get("regular") === "on",
//       cargo: formData.get("cargo") === "on",
//     },
//   };
//   saveConfig(config);
//   return json({ success: true });
// };

// export const loader = () => {
//   return json(getConfig());
// };

// export default function SettingsPage() {
//   const config = useLoaderData();
//   const navigation = useNavigation();

//   // Local state to control inputs
//   const [accessKey, setAccessKey] = useState("");
//   const [secretKey, setSecretKey] = useState("");
//   const [couriers, setCouriers] = useState({
//     sameday: false,
//     nextday: false,
//     regular: false,
//     cargo: false,
//   });

//   // On loader data change, set state
//   useEffect(() => {
//     if (config) {
//       setAccessKey(config.accessKey || "");
//       setSecretKey(config.secretKey || "");
//       setCouriers({
//         sameday: config.couriers?.sameday || false,
//         nextday: config.couriers?.nextday || false,
//         regular: config.couriers?.regular || false,
//         cargo: config.couriers?.cargo || false,
//       });
//     }
//   }, [config]);

//   // Checkbox toggle handler
//   const toggleCourier = (type) => {
//     setCouriers((prev) => ({
//       ...prev,
//       [type]: !prev[type],
//     }));
//   };

//   return (
//     <Page title="Shipping Rate Settings">
//       <Layout>
//         <Layout.Section>
//           <Card sectioned>
//             <Form method="post">
//               <FormLayout>
//                 <TextField
//                   name="accessKey"
//                   label="Access Key"
//                   value={accessKey}
//                   onChange={setAccessKey}
//                 />
//                 <TextField
//                   name="secretKey"
//                   label="Secret Key"
//                   value={secretKey}
//                   onChange={setSecretKey}
//                   type="password"
//                 />
//                 <Checkbox
//                   name="sameday"
//                   label="Same Day"
//                   checked={couriers.sameday}
//                   onChange={() => toggleCourier("sameday")}
//                 />
//                 <Checkbox
//                   name="nextday"
//                   label="Next Day"
//                   checked={couriers.nextday}
//                   onChange={() => toggleCourier("nextday")}
//                 />
//                 <Checkbox
//                   name="regular"
//                   label="Regular"
//                   checked={couriers.regular}
//                   onChange={() => toggleCourier("regular")}
//                 />
//                 <Checkbox
//                   name="cargo"
//                   label="Cargo"
//                   checked={couriers.cargo}
//                   onChange={() => toggleCourier("cargo")}
//                 />
//                 <Button submit loading={navigation.state === "submitting"} primary>
//                   Save Settings
//                 </Button>
//               </FormLayout>
//             </Form>
//           </Card>
//         </Layout.Section>
//       </Layout>
//     </Page>
//   );
// }

import { json } from "@remix-run/node";
import { useLoaderData, Form, useNavigation } from "@remix-run/react";
import {
  Page, Layout, TextField, Button, Checkbox, Card, FormLayout,
} from "@shopify/polaris" assert { type: 'json' };
import { useState, useEffect } from "react";
import { saveConfig, getConfig } from "../lib/configStore";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const config = {
    accessKey: formData.get("accessKey"),
    secretKey: formData.get("secretKey"),
    couriers: {
      sameday: formData.get("sameday") === "on",
      nextday: formData.get("nextday") === "on",
      regular: formData.get("regular") === "on",
      cargo: formData.get("cargo") === "on",
    },
  };
  saveConfig(config);
  return json({ success: true });
};

export const loader = () => {
  return json(getConfig());
};

export default function SettingsPage() {
  const config = useLoaderData();
  const navigation = useNavigation();
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [couriers, setCouriers] = useState({
    sameday: false,
    nextday: false,
    regular: false,
    cargo: false,
  });

  useEffect(() => {
    if (config) {
      setAccessKey(config.accessKey || "");
      setSecretKey(config.secretKey || "");
      setCouriers({
        sameday: config.couriers?.sameday || false,
        nextday: config.couriers?.nextday || false,
        regular: config.couriers?.regular || false,
        cargo: config.couriers?.cargo || false,
      });
    }
  }, [config]);

  const toggleCourier = (type) => {
    setCouriers((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <Page title="Shipping Rate Settings">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Form method="post">
              <FormLayout>
                <TextField name="accessKey" label="Access Key" value={accessKey} onChange={setAccessKey} />
                <TextField name="secretKey" label="Secret Key" value={secretKey} onChange={setSecretKey} type="password" />
                <Checkbox name="sameday" label="Same Day" checked={couriers.sameday} onChange={() => toggleCourier("sameday")} />
                <Checkbox name="nextday" label="Next Day" checked={couriers.nextday} onChange={() => toggleCourier("nextday")} />
                <Checkbox name="regular" label="Regular" checked={couriers.regular} onChange={() => toggleCourier("regular")} />
                <Checkbox name="cargo" label="Cargo" checked={couriers.cargo} onChange={() => toggleCourier("cargo")} />
                <Button submit loading={navigation.state === "submitting"} primary>Save Settings</Button>
              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
