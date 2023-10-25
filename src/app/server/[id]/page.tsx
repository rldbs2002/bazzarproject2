import React from "react";
import { notFound } from "next/navigation";
import Form from "@/app/components/project/Form";
import CalculatorForm from "@/app/components/project/CalculateForm";
import styles from "./page.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Stepper, Step, StepLabel } from "@mui/material";
import { Alert } from "@mui/material";
import IntegratedUploadButton from "@/app/components/project/IntegratedUploadButton";

// async function getData(id: any) {
//   const res = await fetch(`http://localhost:3000/api/request/${id}`, {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     return notFound();
//   }
//   return res.json();
// }

export async function generateMetadata({ params }: any) {
//   const post = await getData(params.id);
//   return {
//     title: post.title,
//     description: post.desc,
//   };
// }

const SeverPage = async ({ params }: any) => {
  // const data = await getData(params.id);
  // console.log(data);

  return (
    <></>
    // <Container maxWidth="xl">
    //   <Stepper alternativeLabel>
    //     <Step completed={data.status >= 1}>
    //       <StepLabel>Status: Request has been submitted</StepLabel>
    //     </Step>
    //     <Step completed={data.status >= 2}>
    //       <StepLabel>Status: Price calculation is in progress</StepLabel>
    //     </Step>
    //     <Step completed={data.status >= 3}>
    //       <StepLabel>Status: User Confirm completed</StepLabel>
    //     </Step>
    //     <Step completed={data.status >= 5}>
    //       <StepLabel>Status: Arrived</StepLabel>
    //     </Step>
    //     <Step completed={data.status >= 6}>
    //       <StepLabel>Status: Repacking</StepLabel>
    //     </Step>
    //     <Step completed={data.status >= 7}>
    //       <StepLabel>Status: Shipping</StepLabel>
    //     </Step>
    //   </Stepper>
    //   <Form data={data} />
    //   <CalculatorForm params={params} data={data} />
    //   <IntegratedUploadButton params={params} uploadType="arrived" />
    //   <IntegratedUploadButton params={params} uploadType="repacking" />
    //   <IntegratedUploadButton params={params} uploadType="shipping" />
    //   {/* <ArrivedUploadButton params={params} />
    //   <RepackingUploadButton params={params} />
    //   <ShippingUploadButton params={params} /> */}

    //   <div style={{ padding: "16px" }}>
    //     {data.status >= 1 && (
    //       <Alert severity="info">
    //         <Typography variant="body2">
    //           Status: Request has been submitted
    //         </Typography>
    //         <Typography variant="body2">
    //           Submitted at: {data.request_submitted_at}
    //         </Typography>
    //       </Alert>
    //     )}

    //     {data.status >= 2 && (
    //       <Alert severity="info">
    //         <Typography variant="body2">
    //           Price calculation is in progress.
    //         </Typography>
    //         <Typography variant="body2">
    //           Price: {data.price_calculate.total_price}
    //         </Typography>
    //       </Alert>
    //     )}

    //     {data.status >= 3 && (
    //       <Alert severity="success">
    //         <Typography variant="body2">
    //           Status: User Confirm completed
    //         </Typography>
    //       </Alert>
    //     )}

    //     {data.status >= 5 && (
    //       <Card variant="outlined" style={{ marginBottom: "16px" }}>
    //         <CardContent>
    //           <Typography variant="h6" component="div">
    //             Arrived
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             Arrived at: {data.arrived.arrived_at}
    //           </Typography>
    //           <div className={styles.imageContainer}>
    //             {data.arrived.arrived_images.map(
    //               (image: string, index: number) => (
    //                 <img
    //                   key={index}
    //                   src={image}
    //                   alt={`Arrived Image ${index}`}
    //                   className={styles.image}
    //                 />
    //               )
    //             )}
    //           </div>
    //         </CardContent>
    //       </Card>
    //     )}

    //     {data.status >= 6 && (
    //       <Card variant="outlined" style={{ marginBottom: "16px" }}>
    //         <CardContent>
    //           <Typography variant="h6" component="div">
    //             Repacking
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             Repacking at: {data.repacking.repacking_at}
    //           </Typography>
    //           <div className={styles.imageContainer}>
    //             {data.repacking.repacking_images.map(
    //               (image: string, index: number) => (
    //                 <img
    //                   key={index}
    //                   src={image}
    //                   alt={`Repacking Image ${index}`}
    //                   className={styles.image}
    //                 />
    //               )
    //             )}
    //           </div>
    //         </CardContent>
    //       </Card>
    //     )}

    //     {data.status >= 7 && (
    //       <Card variant="outlined" style={{ marginBottom: "16px" }}>
    //         <CardContent>
    //           <Typography variant="h6" component="div">
    //             Shipping
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             Shipping at: {data.shipping.shipping_at}
    //           </Typography>
    //           <div className={styles.imageContainer}>
    //             {data.shipping.shipping_images.map(
    //               (image: string, index: number) => (
    //                 <img
    //                   key={index}
    //                   src={image}
    //                   alt={`Shipping Image ${index}`}
    //                   className={styles.image}
    //                 />
    //               )
    //             )}
    //           </div>
    //         </CardContent>
    //       </Card>
    //     )}
    //   </div>
    //   <div style={{ padding: "16px" }}>
    //     <p>Data from Server:</p>
    //     <pre>{JSON.stringify(data, null, 2)}</pre>
    //   </div>
    // </Container>
  );
};

export default SeverPage;
