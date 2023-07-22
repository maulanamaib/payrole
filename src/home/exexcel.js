import React, { ChangeEvent, Suspense, useEffect, useState } from "react";
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
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button, Grid, MenuItem } from "@mui/material";
import Modal from "@mui/material/Modal";
// import Input from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
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
// import Navbar from "../drawer";
import Navbar from "../drawer/drawer";
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

export default function ApiFile() {
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

  const [mail, setMail] = useState(false);
  function handleMail(evt) {
    const value = evt.target.value;
    console.log(value);
    setEmail(value);
  }
  const handleEmail = () => {
    // setLoading(true)
    const formData = {};
    formData["data"] = movies;
    formData["iduser"] = "59";
    axios
      .post(
        baseURL + "export-excel",
        { email: email, data: formData, saveEmail: [saveMail] },
        {
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      )
      .then(function (respone) {
        console.log(respone);
        // setEdit(true)
        // setLoading(false)
        // handleClickex(respone);
        console.log(respone);
      })
      .catch(function (error) {
        console.log(error);
        // handleClickerr(error);
        // setLoading(false)
      });
  };
  // const handleExport = async(event)=>{
  //   // console.log(File[0])
  //   // event.preventDefault()
  //   const formData = {}
  //   formData['data']= movies
  //   formData['iduser']='59'
  // const formData = new FormData();
  // formData.append("data", movies);
  // formData.append("iduser", '134');
  // console.log(formData)
  //   for (var pair of formData.entries()) {
  //     console.log(pair[0]+ ', ' + pair[1]);
  // }
  // axios.post(baseURL,formData)
  //   axios.post(baseURL+'export-excel',
  //         formData, {
  //           headers: {
  //             'Content-Type': 'application/JSON'
  //           }
  //         }
  //       ).then(function (respone) {
  //         console.log(respone);
  // //         handleClickex(respone);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         // handleClickexerr(error);
  //       });

  // };
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
  // const [getmail, setGetmail] = useState();
  useEffect(() => {
    getEmail();
  }, []);

  const getEmail = async () => {
    await axios
      .get(baseURL + "getemail/59")
      .then(function (respone) {
        setEmail(respone.data.values);
        console.log(respone);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const optemail = [
  //   {
  //     value: email,
  //     label: email,
  //   },
  // ];
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
    let headers = ["jenis_transaksi,jumlah_transaksi"];

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
  // const [checkMail, SetCheckmail] = useState();
  const [saveMail, setSaveMail] = useState(false);
  const handleSave = () => {
    setSaveMail(!saveMail);
    console.log(!saveMail);
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
          // setMovies(rows)
          axios
            .post(baseURL + "checkheadercsv", rows, {
              headers: {
                "Content-Type": "application/JSON",
              },
            })
            .then(function (respone) {
              console.log(respone);
              console.log(1);
              setMovies(respone.data.values);
              // setMovies([
              //   { jenis_transaksi: 'Penginputan', jumlah_transaksi: 96, index: 0 },
              //   { jenis_transaksi: 'Penginputan', jumlah_transaksi: 4, index: 1 }
              // ])
            })
            .catch(function (error) {
              console.log(error);
              handleClickFileErr(error);
              console.log(0);
            });
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
  const [email, setEmail] = useState();
  // const [checkedin, setChecked] = useState([]);
  const [content, setContent] = useState();
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
  const [create, setCreate] = useState(false);

  const handleOpenEdit = (id) => {
    setEdit(true);
    setTab(id);
    // console.log(tab)
    const name = movies[id].jenis_transaksi;
    const jumlah = movies[id].jumlah_transaksi;
    setNm(name);
    setJmlh(jumlah);
  };
  const handleOpenMail = () => setMail(true);
  const handleOpenCreate = () => setCreate(true);

  const [cnm, setCnm] = useState();
  const [cjmlh, setCjmlh] = useState();
  function handleCreatenm(evt) {
    const value = evt.target.value;
    // console.log(value);
    setCnm(value);
  }
  function handleCreatejmlh(evt) {
    const value = evt.target.value;
    setCjmlh(value);
  }
  function handleChangenm(evt) {
    const value = evt.target.value;
    // console.log(value);
    setNm(value);
  }
  function handleChangejmlh(evt) {
    const value = evt.target.value;
    setJmlh(value);
  }

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

  const handleUpdate = () => {
    let obj = {
      jenis_transaksi: nm,
      jumlah_transaksi: Jmlh,
    };

    // console.log(obj)
    //  tab.prevenDefault();
    axios
      .put(
        baseURL + "edit/" + tab,
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
        handleClickmass(respone);
      })
      .catch(function (error) {
        console.log(error);
        handleClickerr(error);
      });
  };

  const handleCreate = () => {
    let obj = {
      jenis_transaksi: cnm,
      jumlah_transaksi: cjmlh,
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
        handleClickmass(respone);
      })
      .catch(function (error) {
        console.log(error);
        handleClickerr(error);
      });
  };

  const handleCloseEdit = () => setEdit(false);
  const handleCloseCreate = () => setCreate(false);
  const handleCloseMail = () => setMail(false);

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
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <Box sx={{ padding: "1px" }}>
      <div className="row">
        <div className="custom-file">
          <ButtonGroup variant="contained" aria-label="outlined primary button group"   orientation={`${matches ? `horizontal` : `vertical`}`}
>
            <Button style={{ marginRight: "auto" }} onClick={handleOpen}>
              Choose file
            </Button>
            <Button style={{ marginRight: "auto" }} onClick={FormatCsv}>
              Download Format
            </Button>

            {/* <td  >File harus berbentuk .csv/.XLSX</td> */}
            <Button style={{ marginleft: "500px" }} onClick={exportToCsv}>
              download<i className="fa fa-download"></i>
            </Button>

            <Button
              style={{ marginInlineEnd: "end" }}
              color="error"
              onClick={deleteAll}
              endIcon={<DeleteOutlineIcon />}
            >
              DELETE ALL
            </Button>
            <Button
              sx={{ alignItems: "center", marginLeft: "500px" }}
              onClick={handleOpenCreate}
              color="success"
              endIcon={<AddIcon />}
            >
              Create
            </Button>

            {/* <form> */}
            {/* <input id="files" name='files' type='file' value='' hidden /> */}

            <Button
              onClick={handleOpenMail}
              sx={{ alignItems: "auto", marginRight: "20px" }}
              endIcon={<SendIcon />}
            >
              Export DB
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
              sx={{
                minWidth: 10,
                display: "grid",
                background: "linear-gradient(45deg, #f0f1f7 30%, #6b81fe 90%)",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }} align="center">
                <Typography component="div" variant="h5" alignItems="center">
                  Edit Data
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
                <TextField
                  id="outlined-basic"
                  type="idtransaksi"
                  label="Idtransaksi"
                  variant="outlined"
                  value={tab}
                />
                <TextField
                  id="outlined-basic"
                  type="jenis_transaksi"
                  label="Jenis Transaksi"
                  variant="outlined"
                  value={nm}
                  onChange={handleChangenm}
                />
                <TextField
                  id="outlined-basic"
                  type="Number"
                  label="Jumlah Transaksi"
                  variant="outlined"
                  value={Jmlh}
                  onChange={handleChangejmlh}
                />

                <Button
                  type="submit"
                  onClick={handleUpdate}
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
        open={mail}
        onClose={handleCloseMail}
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
                  Masukkan Email
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
                onSubmit={handleCloseMail}
              >
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "38ch" },
                  }}
                  noValidate
                  autoComplete="off"
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
                  >
                    {/* <MenuItem>{[email] + 1}</MenuItem> */}
                  </TextField>
                  <div>
                    <input
                      type="checkbox"
                      onChange={handleSave}
                      checked={saveMail}
                    />
                    save Email
                  </div>
                  <Button
                    type="submit"
                    onClick={handleEmail}
                    component="button"
                    sx={{ minWidth: 330 }}
                    variant="contained"
                  >
                    kirim
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={create}
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
            <Card
              sx={{
                minWidth: 10,
                display: "grid",
                background: "linear-gradient(45deg, #f0f1f7 30%, #6b81fe 90%)",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }} align="center">
                <Typography component="div" variant="h5" alignItems="center">
                  Tambah Data
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
                <TextField
                  id="outlined-basic"
                  type="jenis_transaksi"
                  label="Jenis Transaksi"
                  variant="outlined"
                  value={cnm}
                  onChange={handleCreatenm}
                />
                <TextField
                  id="outlined-basic"
                  type="Number"
                  label="Jumlah Transaksi"
                  variant="outlined"
                  value={cjmlh}
                  onChange={handleCreatejmlh}
                />

                <Button
                  type="submit"
                  onClick={handleCreate}
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
            DATA Can't UPDATE!!
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
              {/* <TableCell><Checkbox/></TableCell> */}
              {/* <TableCell>idtransaksi</TableCell> */}
              <TableCell>jenis_transaksi</TableCell>
              <TableCell>jumlah_transaksi</TableCell>
              <TableCell>action</TableCell>
              {/* <TableCell>idsession</TableCell>
 <TableCell>action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.length ? (
              movies.map(
                (movie, index) => (
                  // useTab(index),
                  (movies[index]["index"] = index),
                  (
                    <TableRow key={index} onChange={changeTable} value="table">
                      {/* <TableCell><Checkbox></Checkbox></TableCell> */}
                      {/* <TableCell name='iditem' value='idtransaksi'  scope="row"> { movie.index+1 }</TableCell> */}
                      <TableCell name="namaitem" value="jenis_transaksi">
                        {" "}
                        {movie.jenis_transaksi}
                      </TableCell>
                      <TableCell name="jumlahitem" value="jumlah_transaksi">
                        {" "}
                        {movie.jumlah_transaksi}
                      </TableCell>
                      {/* <TableCell name='iduser'  ><Input value={ movie.iduser }/></TableCell>
                 <TableCell name='idsession'  ><Input value={ movie.idsession }/></TableCell> */}
                      {/* <Button variant="contained" color="succes" onClick={handleOpenCreate}>Create</Button> */}
                      <Box sx={{ pl: 1, pb: 5 }}>
                        <Stack spacing={2} direction="row">
                          {/* <Button  variant="contained" color='error' onClick={console.log(movies)}>delete</Button> */}
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleRemove(index)}
                          >
                            delete
                          </Button>

                          <Button
                            variant="contained"
                            color="success"
                            onChange={handleOpenEdit}
                            onClick={() => handleOpenEdit(index)}
                          >
                            {" "}
                            update
                          </Button>
                          {/* <Button variant="contained" color="succes" onClick={()=>handleOpenCreate(index)}>Create</Button> */}
                        </Stack>
                      </Box>
                    </TableRow>
                  )
                )
              )
            ) : (
              <td colSpan="5" className="text-center">
                No Data Found.
              </td>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
