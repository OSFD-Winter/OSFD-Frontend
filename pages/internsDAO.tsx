// @ts-nocheck
import { Box } from "@mui/material";

import Banner from "../components/internsDAO/banner";
import InternsDAOMinter from "../components/internsDAO/internsDAOMinter";
import Proposals from "../components/proposals";
import Footer from "../components/footer";
import { Certificate } from "crypto";

const InternsDAO: NextPage = () => {
  const space = "internsdao.eth";
  return (
    <Box sx={{ height: "100%" }}>
      <Banner></Banner>
      <Proposals space={space}></Proposals>

      <InternsDAOMinter></InternsDAOMinter>

      <Footer />
    </Box>
  );
};

export default InternsDAO;
