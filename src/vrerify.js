import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import { read, utils, XLSX, writeFile } from "xlsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Button, fabClasses, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import OtpInput from "react-otp-input";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  styled,
  ThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
// import AppBar from "@mui/material/AppBar";
import { selectClasses, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Navbar from "./drawer/drawer";
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
// import XLSX from 'xlsx';
// import { handleFileChange, handleUploadClick } from "./pages/profile";

// import TambahComp,{Addmahasiswa , handlChange} from "./pages/profile";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

export default function Verify() {
  const baseURL = "http://192.168.60.99:3000/";

  const [buka, setBuka] = useState(false);
  const handleOpen = () => setBuka(true);
  const handleClose = () => setBuka(false);

  const [movies, setMovies] = useState([]);
  // setMovies([{index:0}]);
  const [post, setPost] = useState(null);
  // const data = {};

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [File, setFile] = useState([]);

  const handleExport = async (event) => {
    // console.log(File[0])
    // event.preventDefault()
    const formData = {};
    formData["data"] = movies;
    formData["iduser"] = "58";
    // const formData = new FormData();
    // formData.append("data", movies);
    // formData.append("iduser", '134');
    // console.log(formData)
    //   for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]);
    // }
    // axios.post(baseURL,formData)
    axios
      .post(baseURL + "export-excel", formData, {
        headers: {
          "Content-Type": "application/JSON",
        },
      })
      .then(function (respone) {
        console.log(respone);
        handleClickex(respone);
      })
      .catch(function (error) {
        console.log(error);
        handleClickexerr(error);
      });
  };
  // const handleDownload = () => {
  //   // const fromData=[[]]
  //   // fromData=movies
  //   const headings = [[
  //       movies

  //   ]];

  //   const wb = utils.book_new();
  //   const ws = utils.json_to_sheet([]);
  //   utils.sheet_add_aoa(ws, headings);
  //   utils.sheet_add_json(ws, headings, { origin: 'A2', skipHeader: true });
  //   utils.book_append_sheet(wb, ws, 'Report');
  //   writeFile(wb, 'Movie Report.xlsx');
  // }

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const FormatCsv = (e) => {
    let headers = ["idtransaksi,jenis_transaksi,jumlah_transaksi,"];
    downloadFile({
      data: [...headers].join("\n"),
      fileName: " users.csv",
      fileType: "text/csv",
    });
  };
  const exportToCsv = (e) => {
    // console.log(movies)
    e.preventDefault();

    // Headers for each column
    let headers = ["Iditem,Nameitem,jumlahitem"];

    // Convert users data to a csv
    let usersCsv = movies.reduce((acc, user) => {
      const { index, jenis_transaksi, jumlah_transaksi } = user;
      acc.push([index, jenis_transaksi, jumlah_transaksi].join(","));
      return acc;
    }, []);
    var date = Date.now();
    axios
      .post(
        baseURL + "formatmoment",
        { data: date },
        {
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      )
      .then(function (respone) {
        console.log(respone.data.values);
        downloadFile({
          data: [...headers, ...usersCsv].join("\n"),
          fileName: respone.data.values + " users.csv",
          fileType: "text/csv",
        });
      });
  };

  const handleImport = async ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      // setFile([file]);
      // document.getElementById('files').value=file ;
      const reader = new FileReader();
      reader.onload = async (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          // setMovies(rows)
          // console.log(rows)
          setMovies(rows);
          //     axios.post(baseURL+'checkheadercsv',
          //   rows, {
          //     headers: {
          //       'Content-Type': 'application/JSON'
          //     }
          //   }
          // ).then(function (respone) {
          //   console.log(respone);
          //   // console.log(rows)
          //   setMovies(respone.data.values)

          // })
          // .catch(function (error) {
          //   console.log(error);
          //   handleClickFileErr(error);
          // });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const [table, setTable] = useState([]);

  const changeTable = (event) => {
    setTable(event.target.value);
  };
  // const HandleDelete=()=>{

  //     const val={
  //       table: table,

  //     }

  //     axios.post(baseURL,
  //       val, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data'
  //         }
  //       }
  //     ).then(function (respone) {
  //       console.log(respone);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   }

  // const [bar, setBar]=useState();

  // const cange
  const [content, setContent] = useState([]);
  const handleRemove = (id) => {
    axios
      .delete(
        baseURL + "delete/" + id,
        { data: { data: movies } },
        {
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      )
      .then(function (respone) {
        setMovies(respone.data.values);
        handleClickmassdel(respone);
      })
      .catch(function (error) {
        console.log(error);
        handleClickDelerr(error);
      });
  };

  const [isCheck, setCheck] = useState();
  const ref = useRef();
  const [checkedin, setChecked] = useState([]);
  // const check = id => {
  //   var {obj,checked}=content[id];
  //   setChecked([...checkedin, obj]);
  //   if (!checked) {
  //     setChecked(checkedin.filter(item => item !== obj));
  //   }
  //   console.log(checkedin)
  // };
  // const check =(id)=>{
  //   var obj={
  //    IDTDETAIL:content[id],
  //   }
  //   setChecked(obj)
  //   var updatedList = [...checked];
  //   if (id.target.checked) {
  //     updatedList = [...checked, id.target.value];
  //   } else {
  //     updatedList.splice(checked.indexOf(id.target.value), 1);
  //   }
  //   setChecked(updatedList);

  // console.log(updatedList)
  // console.log(ref.current.checked)

  // console.log(obj)

  //
  // }
  // const checkedItems = checked.length
  // ? checked.reduce((total, item) => {
  //     return total + ", " + item;
  //   })
  // : "";
  const [checkin, setCheckedin] = useState();
  const [useCheckAll, setCheckAll] = useState(false);
  // const handleSelectAll =(id)=> {
  //   setCheckAll(!useCheckAll);
  //   setChecked(content.map(li => li.IDTDETAIL));
  //   if (useCheckAll) {
  //     setChecked([]);
  //   }
  //   console.log(checked)
  // };
  // const toggleCheck = (inputName) => {
  //   setChecked((prevState) => {
  //     const newState = { ...prevState };
  //     newState[inputName] = !prevState[inputName];
  //     return newState;
  //   });
  // };
  // const selectAll = (value) => {
  //   setCheckAll(value);
  //   setChecked((prevState) => {
  //     const newState = { ...prevState };
  //     for (const inputName in newState) {
  //       newState[inputName] = value;
  //     }
  //     return newState;
  //   });
  // };

  // useEffect(() => {
  //   let allChecked = true;
  //   for (const inputName in checked) {
  //     if (checked[inputName] === false) {
  //       allChecked = false;
  //     }
  //   }
  //   if (allChecked) {
  //     setCheckAll(true);
  //   } else {
  //     setCheckAll(false);
  //   }
  // }, [checked]);

  // const handleChange = (e) => {
  //   const { name, checked } = e.target;
  //   if (name === "allSelect") {
  //     let tempUser = content.map((user) => {
  //       return { ...user, isChecked: checked };
  //     });
  //     setContent(tempUser);
  //   } else {
  //     let tempUser = content.map((user) =>
  //       user.name === name ? { ...user, isChecked: checked } : user
  //     );
  //     setContent(tempUser);
  //   }
  //   console.log(checked)
  // };

  useEffect(() => {
    axios
      .get(baseURL + "showunverified")
      .then(function (respone) {
        setContent(respone.data.values);
        // console.log(respone)s
      })
      .catch(function (error) {
        console.log(error);
      });
    setChecked(
      content.map((d) => {
        return {
          select: false,
          IDTDETAIL: d.IDTDETAIL,
          JENIS_TRANSAKSI: d.JENIS_TRANSAKSI,
          JUMLAH_TRANSAKSI: d.JUMLAH_TRANSAKSI,
          // major: d.major
        };
      })
    );
  }, []);
  // console.log(content)

  // const arr= content.map((conten, index)=>{
  //   return(
  //              <TableRow  value='table'>

  //                   <TableCell name='iditem' value='idtransaksi'  scope="row"> {conten.IDTDETAIL }</TableCell>
  //                  <TableCell name='namaitem' value='jenis_transaksi'  > {conten.JENIS_TRANSAKSI }</TableCell>
  //                  <TableCell name='jumlahitem' value='jumlah_transaksi' > { conten.JUMLALH_TRANSAKSI}</TableCell>
  //              </TableRow>

  // )})
  // console.log(content)
  const [isloading, setLoading] = useState(false);
  const [email, setEmail] = useState();

  const handleEmail = () => {
    setLoading(true);
    axios
      .post(
        baseURL + "sendingemail",
        { email: email, data: checkedin },
        {
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      )
      .then(function (respone) {
        console.log(respone);
        // setEdit(true)
        setLoading(false);
        // console.log(respone)s
      })
      .catch(function (error) {
        console.log(error);
        handleClickerr(error);
        setLoading(false);
      });
  };
  function handleMail(evt) {
    const value = evt.target.value;
    // console.log(value);
    setEmail(value);
  }
  // const checkAll=(id)=>{
  //   var obj={
  //     data: useCheckAll,
  //   }
  // console.log(obj)
  // }
  const navigate = useNavigate();
  // function handleUpdate(id){
  //   id.prevenDefault()
  //   axios.put(baseURL+'/'+id,{data:{data:movies}},{ headers: {
  //     'Content-Type': 'application/JSON'
  // }})
  //   .then(function (respone) {
  //     setMovies(respone.data.values);

  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  const [tab, setTab] = useState();
  // const [allin, setAllin]=useState('');
  const [nm, setNm] = useState();
  const [Jmlh, setJmlh] = useState();
  const [readnm, setReadnm] = useState();
  const [edit, setEdit] = useState(false);
  const [mail, setMail] = useState(false);
  // const [load, setLoad]= useState(false);

  const handleOpenEdit = (id) => {
    setEdit(true);
    // setTab(id);
    // // console.log(tab)
    // const name = movies[id].jenis_transaksi;
    // const jumlah= movies[id].jumlah_transaksi;
    // setNm(name);
    // setJmlh(jumlah);
  };
  const handleOpenCreate = () => setEdit(true);
  const [number, setNumber] = useState();
  const [otp, setOtp] = useState();

  // function handleCreatejmlh(evt) {
  //   const value = evt.target.value;
  //   setCjmlh(value
  //   );
  // }
  function handleChangenm(evt) {
    const value = evt.target.value;
    // console.log(value);
    setNm(value);
  }
  const handleChangeotp = (otp) => setOtp(otp);

  const deleteAll = () => {
    axios
      .delete(baseURL + "deleteall", {
        headers: { "Content-Type": "application/JSON" },
      })
      .then(function (respone) {
        console.log(respone);
        setMovies(respone);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleOTP = () => {
    // console.log(obj)
    //  tab.prevenDefault();
    axios
      .post(
        baseURL + "verifikasikode",
        { data: checkedin, kode_referral: otp },
        {
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      )
      .then(function (respone) {
        console.log(respone);
        setContent(respone.data.values);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCreate = () => {
    let obj = {
      number: number,
    };

    // console.log(obj)
    //  tab.prevenDefault();
    axios
      .post(
        baseURL + "create/",
        { data: movies, new_data: obj },
        {
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      )
      .then(function (respone) {
        // console.log(respone)
        setMovies(respone.data.values);
        // handleClickmas(respone)
      })
      .catch(function (error) {
        console.log(error);
        // handleClickerr(error);
      });
  };

  const handleCloseEdit = () => setEdit(false);
  const handleCloseCreate = () => setMail(false);

  const [openmass, setOpenMass] = useState(false);

  const handleClickmass = () => {
    setOpenMass(true);
  };

  const handleClosemass = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMass(false);
  };

  const [openex, setEx] = useState(false);

  const handleClickex = () => {
    setEx(true);
  };

  const handleCloseex = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setEx(false);
  };
  const [openexerr, setExerr] = useState(false);

  const handleClickexerr = () => {
    setExerr(true);
  };

  const handleCloseexerr = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setExerr(false);
  };

  const [openmassdel, setOpenMassdel] = useState(false);

  const handleClickmassdel = () => {
    setOpenMassdel(true);
  };

  const handleClosemassdel = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMassdel(false);
  };

  const [openerr, setOpenErr] = useState(false);

  const handleClickerr = () => {
    setOpenErr(true);
  };

  const handleCloseerr = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErr(false);
  };

  const [opendelerr, setOpenDelErr] = useState(false);

  const handleClickDelerr = () => {
    setOpenDelErr(true);
  };

  const handleClosDeleerr = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDelErr(false);
  };
  const [openfileerr, setOpenFileErr] = useState(false);

  const handleClickFileErr = () => {
    setOpenFileErr(true);
  };

  const handleClosFileErr = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenFileErr(false);
  };

  return (
    <Box sx={{ padding: "1px" }}>
      <div className="row">
        <div className="custom-file">
          <ButtonGroup variant="contained" sx={{ display: "flex-outline" }}>
            <Button
              onClick={handleOpenCreate}
              sx={{ alignItems: "auto" }}
              endIcon={<SendIcon />}
            >
              Verify
            </Button>
            {/* </form> */}
          </ButtonGroup>
          <Modal
            open={buka}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                className="custom-file-input"
                id="inputGroupFile"
                onChange={handleImport}
              />
            </Box>
          </Modal>
        </div>
      </div>

      <Modal
        open={mail}
        onClose={handleCloseCreate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Grid
            container
            direction="column"
            alignItems="center"
            position="absolute"
            top="50px"
            left="10px"
            transform="translate(-50%, -50%)"
            justify="center"
            style={{ minHeight: "70vh" }}
          >
            {/* 
    <div style={{position: 'relativ',}}> */}
            <Card sx={{ minWidth: 10, display: "grid", background: "" }}>
              <CardContent sx={{ flex: "1 0 auto" }} align="center">
                <Typography component="div" variant="h5" alignItems="center">
                  Masukkan Nomer
                </Typography>
              </CardContent>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 4, width: "40ch" },
                }}
                noValidate
                autoComplete="off"
                display="grid"
                onSubmit={handleCloseCreate}
              >
                {/* <TextField id="outlined-basic" type='iditem' label="Id Item" variant="outlined" value='' /> */}
                {/* <TextField id="outlined-basic" type='jenis_transaksi' label="Jenis Transaksi" variant="outlined" value={cnm} onChange={handleCreatenm} /> */}
                <TextField
                  id="outlined-basic"
                  type="Email"
                  //    onKeyPress={(event) => {
                  //   if (!/[0-9]/.test(event.key)) {
                  //     event.preventDefault();
                  //   }
                  // }}
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={handleMail}
                />

                <Button
                  type="submit"
                  onClick={handleEmail}
                  disable={isloading}
                  component="button"
                  sx={{ minWidth: 350 }}
                  variant="contained"
                >
                  simpan
                </Button>
              </Box>
            </Card>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={edit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Grid
            container
            direction="column"
            alignItems="center"
            position="absolute"
            top="50px"
            left="10px"
            transform="translate(-50%, -50%)"
            justify="center"
            style={{ minHeight: "70vh" }}
          >
            {/* 
    <div style={{position: 'relativ',}}> */}
            <Card
              sx={{ minWidth: 10, display: "grid", background: " #6b81fe" }}
            >
              <CardContent sx={{ flex: "1 0 auto" }} align="center">
                <Typography component="div" variant="h5" alignItems="center">
                  Masukkan OTP
                </Typography>
              </CardContent>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 4, width: "40ch" },
                }}
                noValidate
                autoComplete="off"
                display="grid"
                onSubmit={handleCloseEdit}
              >
                {/* <TextField id="outlined-basic" type='idtransaksi' label="Idtransaksi" variant="outlined" value={tab} />
        <TextField id="outlined-basic" type='jenis_transaksi' label="Jenis Transaksi" variant="outlined" value={nm} onChange={handleChangenm} /> */}

                <OtpInput
                  // sx={{position:'absolute'}}
                  value={otp}
                  onChange={handleChangeotp}
                  variant="outlined"
                  numInputs={7}
                  separator={<span>-</span>}
                  // isInputNum={true}
                  shouldAutoFocus={true}
                  inputStyle={{
                    border: "1px solid transparent",
                    borderRadius: "8px",
                    width: "40px",
                    height: "40px",
                    fontSize: "12px",
                    color: "#000",
                    fontWeight: "400",
                    caretColor: "blue",
                  }}
                  focusStyle={{
                    border: "1px solid #CFD3DB",
                    outline: "none",
                  }}
                />
                <Button
                  type="submit"
                  onClick={handleOTP}
                  component="button"
                  sx={{ minWidth: 350 }}
                  variant="contained"
                >
                  simpan
                </Button>
              </Box>
            </Card>
          </Grid>
        </Box>
      </Modal>
      <Box>
        <Snackbar open={openex} autoHideDuration={6000} onClose={handleCloseex}>
          <Alert
            onClose={handleCloseex}
            severity="success"
            sx={{ width: "100%" }}
          >
            Data success Export!
          </Alert>
        </Snackbar>
      </Box>
      <Box>
        <Snackbar
          open={openmass}
          autoHideDuration={6000}
          onClose={handleClosemass}
        >
          <Alert
            onClose={handleClosemass}
            severity="success"
            sx={{ width: "100%" }}
          >
            This is a success message!
          </Alert>
        </Snackbar>
      </Box>
      <Box>
        <Snackbar
          open={openmassdel}
          autoHideDuration={6000}
          onClose={handleClosemassdel}
        >
          <Alert
            onClose={handleClosemassdel}
            severity="success"
            sx={{ width: "100%" }}
          >
            DATA succes to DELETE!
          </Alert>
        </Snackbar>
      </Box>
      <Box>
        <Snackbar
          open={openerr}
          autoHideDuration={6000}
          onClose={handleCloseerr}
        >
          <Alert
            onClose={handleCloseerr}
            severity="error"
            sx={{ width: "100%" }}
          >
            Email atau Data Tidak valid!
          </Alert>
        </Snackbar>
      </Box>
      <Box>
        <Snackbar
          open={opendelerr}
          autoHideDuration={6000}
          onClose={handleClosDeleerr}
        >
          <Alert
            onClose={handleClosDeleerr}
            severity="error"
            sx={{ width: "100%" }}
          >
            DATA Can't DELETE!!
          </Alert>
        </Snackbar>
      </Box>
      <Box>
        <Snackbar
          open={openfileerr}
          autoHideDuration={6000}
          onClose={handleClosFileErr}
        >
          <Alert
            onClose={handleClosFileErr}
            severity="error"
            sx={{ width: "100%" }}
          >
            File Can't import because wrong format data!!
          </Alert>
        </Snackbar>
      </Box>
      <Box>
        <Snackbar
          open={openexerr}
          autoHideDuration={6000}
          onClose={handleCloseexerr}
        >
          <Alert
            onClose={handleCloseexerr}
            severity="error"
            sx={{ width: "100%" }}
          >
            File Can't Export because wrong format data!!
          </Alert>
        </Snackbar>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <input
                  type="checkbox"
                  name="allSelect"
                  className="form-check-input"
                  onChange={(e) => {
                    let checked = e.target.checked;
                    setChecked(
                      content.map((d) => {
                        d.select = checked;
                        return d;
                      })
                    );
                  }}
                />
              </TableCell>
              <TableCell>idDetail</TableCell>
              <TableCell>jenis_transaksi</TableCell>
              <TableCell>jumlah_transaksi</TableCell>

              {/* <TableCell>idsession</TableCell>
 <TableCell>action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            <div
              style={{
                minHeight: "1vh",
                position: "absolute",
                direction: "column",
                alignItems: "center",
                top: "250px",
                right: "680px",
                justify: "center",
              }}
            >
              {isloading ? <CircularProgress /> : edit}
            </div>
            {/* {arr} */}
            {/*  */}
            {/* // useTab(index), */}

            {content.map((conten, index) => (
              <TableRow key={index} value="table">
                <TableCell>
                  <input
                    type="checkbox"
                    checked={conten.select}
                    onChange={(event) => {
                      let checked = event.target.checked;
                      setChecked(
                        content.map((data) => {
                          if (conten.IDTDETAIL === data.IDTDETAIL) {
                            data.select = checked;
                          }
                          return data;
                        })
                      );
                    }}
                  />{" "}
                </TableCell>
                <TableCell name="iditem" value="idtdetail" scope="row">
                  {" "}
                  {conten.IDTDETAIL}
                </TableCell>
                <TableCell name="namaitem" value="jenis_transaksi">
                  {" "}
                  {conten.JENIS_TRANSAKSI}
                </TableCell>
                <TableCell name="jumlahitem" value="jumlah_transaksi">
                  {" "}
                  {conten.JUMLAH_TRANSAKSI}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
