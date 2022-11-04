// @ts-nocheck
import { Box } from "@mui/material";

import Banner from "../components/internsDAO/banner"
import InternsDAOMinter from "../components/internsDAO/internsDAOMinter"
import Proposals from "../components/internsDAO/proposals"
import Footer from "../components/footer"
import { Certificate } from "crypto";

const InternsDAO: NextPage = () => {

    return (
        <Box sx={{ height: "100%" }}>
            <Banner></Banner>
            <Proposals></Proposals>

            <InternsDAOMinter></InternsDAOMinter>

            <Footer></Footer>
        </Box >
    );
};

export default InternsDAO;
