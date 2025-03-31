import React from "react";
import { MdPrint } from "react-icons/md";
import { FaShareNodes } from "react-icons/fa6";
import Attendancereport from "./Attendancereport";
import { 
  Box, 
  Typography, 
  Button, 
  Divider, 
  Paper,
  styled, 
  Grid,
  Card
} from "@mui/material";
import Image from "../assets/image.png"
import worker from "../assets/worker.png"
import Header from './Header';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  border: "3px solid #950f95",
  width: "340px",
  height: "580px"
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fcc059",
  color: "black",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#fcc059"
  }
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#950f95",
  color: "white",
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius
}));

function Workerdetail() {
  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: "Work Report",
      text: "Check out this work report.",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
    <Header />
    <Box sx={{ 
      mt: 2, 
      display: "flex", 
      flexWrap: "wrap", 
      gap: 15
    }}>
      {/* <Box sx={{ width: "992px" }}>{<Attendancereport/>}</Box> */}
      <Grid container spacing={1}>
      <Grid item xs={8.5}><Attendancereport/></Grid>
      <Grid item xs={3.5}>
      <Card sx={{p:3,border:"2px solid purple",mt:-1,width:390}}>
        <Box sx={{ display: "flex" }}>
          <img 
            src={Image}
            alt="company logo" 
            style={{ 
              width: "60px", 
              height: "40px", 
              marginLeft:"70px"
            }}
          />
          <Box>
            <Typography 
              variant="h5" 
              sx={{ 
                mt:-1,
                fontWeight: "bold", 
                color: "gray.800",
                marginLeft: 0
              }}
            >
              Company Name
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
              
                fontSize: "14px",ml:3
              }}
            >
              Life Changers Ind
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ 
          mt: 0, 
          borderColor: "#950f95",
          borderWidth: "1px"
        }}/>
        
        <Box sx={{ 
          display: "flex", 
          mt: 1
        }}>
          <img 
            src={worker}
            alt="worker" 
            style={{ 
              height: "60px", 
              width: "60px", 
              borderRadius: "8px",
              marginLeft: "24px"
            }}
          />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: "bold", 
              marginLeft: "16px"
            }}
          >
            Employee Name(position)<br/>
            <span style={{ marginLeft: "40px" }}>Worker Id:</span>
          </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          sx={{ 
            width: "100%",
            borderRadius: "8px",
            px: 3,
            py: 1,
            
            mt: 0,
            fontWeight: "bold",
            backgroundColor: "#fcc059",
            color: "black",
            "&:hover": {
              backgroundColor: "#fcc059"
            }
          }}
        >
          Total Report:300 Report
        </Button>
        
        <Divider sx={{ 
          mt: 2, 
          borderColor: "#950f95",
          borderWidth: "1px"
        }}/>
        
        <Box sx={{ 
          mt: 2, 
          "& > *": { 
            mb: 2 
          },
          color: "white"
        }}>
          <StatItem>
            <Box>
              <Typography variant="caption">Attendance</Typography><br/>
              <Typography variant="h6">
                357 
                <Typography variant="caption" sx={{ ml: 2, fontSize: "11px" }}>
                  Days
                </Typography>
              </Typography>
            </Box>
            <Box sx={{ mt: 1}}>
              <Typography variant="h6">90%</Typography>
            </Box>
          </StatItem>
          
          <StatItem>
            <Box>
              <Typography variant="caption">Permission</Typography><br/>
              <Typography variant="h6">
                60
                <Typography variant="caption" sx={{ ml: 4, fontSize: "11px" }}>
                  Hours
                </Typography>
              </Typography>
            </Box>
            <Box sx={{  mt: 1}}>
              <Typography variant="h6">6%</Typography>
            </Box>
          </StatItem>
          
          <StatItem>
            <Box>
              <Typography variant="caption">Absent</Typography><br/>
              <Typography variant="h6">
                4
                <Typography variant="caption" sx={{ ml: 4, fontSize: "11px" }}>
                  Days
                </Typography>
              </Typography>
            </Box>
            <Box sx={{  mt: 1 }}>
              <Typography variant="h6">2%</Typography>
            </Box>
          </StatItem>
          
          <StatItem sx={{ 
            height: "60px",
            alignItems: "center"
          }}>
            <Box>
              <Typography>Total Working Hours</Typography>
            </Box>
            <Box sx={{ mr: 2, ml: 6 }}>
              <Typography>80 Hr</Typography>
            </Box>
          </StatItem>
        </Box>
        
        <Divider sx={{ 
          mt: 3,
          borderColor: "#950f95",
          borderWidth: "1px"
        }}/>
        
        <Box sx={{ 
          mt: 2, 
          display: "flex" 
        }}>
          <StyledButton 
            onClick={handlePrint}
            startIcon={<MdPrint style={{ fontSize: "24px" }}/>}
            sx={{ px: 9, py: 2 }}
          >
            Print
          </StyledButton>
          <StyledButton 
            onClick={handleShare}
            startIcon={<FaShareNodes style={{ fontSize: "20px", marginTop: "4px" }}/>}
            sx={{ px: 9, ml: 2, py: 2 }}
          >
            Share
          </StyledButton>
        </Box>
      </Card>
      </Grid>
      </Grid>
    </Box>
    </>
  );
}

export default Workerdetail;