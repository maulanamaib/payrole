
            // const [file, setFile] = useState;
          
            // const handleFileChange = (e) => {
            //   if (e.target.files) {
            //     setFile(e.target.files[0]);
            //   }
            // };
          
            // const handleUploadClick = () => {
            //   if (!file) {
            //     return;
            //   }
          
            //   // 👇 Uploading the file using the fetch API to the server
            //   fetch('http://192.168.60.28:3000/export-excel', {
            //     method: 'POST',
            //     body: file,
            //     // 👇 Set headers manually for single file upload
            //     headers: {
            //       'content-type': file.type,
            //       'content-length': `${file.size}`, // 👈 Headers need to be a string
            //     },
            //   })
            //     .then((res) => res.json())
            //     .then((data) => console.log(data))
            //     .catch((err) => console.error(err));
            // }
              
        
      
     // const upload = (event)=>{
            //   event.preventDefault()
            //   const formData = new FormData();
            //   formData.append("files", file);
            //   formData.append("iduser", '102')
            //   // axios.post(baseURL,formData)
            //   try{
            //        axios({
            //          method: 'post',
            //          url: baseURL,
            //          data: formData,
            //          headers: { "Content-Type": "multipart/form-data" },
            //          // message: 'berhasil terupload', \
            //        })
                            
            //          .then(function (response) {
            //             console.log(response);
            //           })
            //           .catch(function (error) {
            //             console.log(error);
            //         });
            //                 }
                          
            //             finally{}  
            //   }}
        
                       
      
  
  // const [selectedFile, setSelectedFile] = React.useState(null);

  // const upload = (event)=>{
  //     event.preventDefault()
  //     const formData = new FormData();
  //     formData.append("files",selectedFile);
  //     formData.append("iduser", '102')
  //     // axios.post(baseURL,formData)
  //     try{
  //          axios({
  //            method: 'post',
  //            url: baseURL,
  //            data: formData,
  //            headers: { "Content-Type": "multipart/form-data" },
  //            // message: 'berhasil terupload', \
  //          })
                    
  //            .then(function (response) {
  //               console.log(response);
  //             })
  //             .catch(function (error) {
  //               console.log(error);
  //           });
  //                   }
                  
  //               finally{}  
  //     }
          
  //     const handleFileSelect = (event) => {
  //       setSelectedFile(event.target.files[0])
  //     }
  // const [csv, setCsv] = useState([]);
  // const [up, setUp] = useState(null);
  // const Uploading = async ($event) => {
  //   console.log(data)
      // const files = $event.target.files;
      // if (files.length) {
      //     const file = files[0];
      //     const reader = new FileReader();
      //     reader.onload = async (event) => {
      //         const wb = read(event.target.result);
      //         const sheets = wb.SheetNames;

      //         if (sheets.length) {
      //             const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
      //             setMovies(rows)
      //         }
      //         event.preventDefault()
      //         const formData = new FormData();
      //         formData.append("files", file);
      //         formData.append("iduser", '102')
      //         // axios.post(baseURL,formData)
  //             try{
  //               await axios({
  //                 method: 'post',
  //                 url: baseURL,
  //                 data: data,
  //                 headers: { "Content-Type": "multipart/form-data" },
  //                 // message: 'berhasil terupload', \
  //               })
              
  //                 .then(function (response) {
  //                    console.log(response);
  //                  })
  //                  .catch(function (error) {
  //                    console.log(error);
  //                });
  //             }
  //         finally{}     
  //         }
  //         reader.readAsArrayBuffer(file);
      // }
      
  // }
  // const fromForm =()=>{formd}
  // const ExportDb =()=>{
  //   return(
  //         axios({
  //         method : 'post',
  //         url: baseURL,
  //         data: handleImport,
  //         headers: { "Content-Type": "multipart/form-data" },
  //         // message: 'berhasil terupload', \
      
  //     })
     
    
  //       .then(function (response) {
  //          console.log(response);
  //        })
  //        .catch(function (error) {
  //          console.log(error);
  //      })
  //      );
  //   }

  // const [file, setFile] = useState('');
  // const changeFile = (event)=> {
  //     setFile(event.target.value);
  //   };
  // const uploads =(event)=>{
   
  //   const Data ={
  //     file,
  //   }
  //   const wb = utils.book_new();
  //   const ws = utils.json_to_sheet([]);
  //   utils.sheet_add_aoa(ws, Data );
  //   utils.sheet_add_json(ws, movies, { origin: 'A2', skipHeader: true });
  //   utils.book_append_sheet(wb, ws, 'Report');
  //   const setData =  writeFile(wb, 'Movie Report.xlsx');
  //     console.log(setData)
  //       axios.
  //       post(baseURL, setData)
  //           .then((response) => {
  //             setPost(response.data);
  //           });
  //   }

    
  
  // const [post, setPost] = useState(null);
  // const [iditem, setIdItem] = useState(''); 
  // const [namlahitem, setJumlahItem] = useState('');
  // const [iduaitem, setNamaItem] = useState('');
  // const [jumser, setIdUser] = useState('');
  // const [idsession, setIdSession] = useState('');
  
  // const changeIditem = (event) => {
  //   setIdItem(event.target.value);
  // };
  // const changeNamaitem = (event) => {
  //   setNamaItem(event.target.value);
  // };
  // const changeJumlahitem = (event) => {
  //   setJumlahItem(event.target.value);
  // };
  // const changeIduser = (event) => {
  //   setIdUser(event.target.value);
  // };
  // const changeIdsession = (event) => {
  //   setIdSession(event.target.value);
  // };
  // React.useEffect(() => {
  //   axios.get(`${baseURL}/1`).then((response) => {
  //     setPost(response.data);
  //   });
  // }, []);
  
  // const up =()=>{
  // const val = {
  //   iditem: 'iditem',
  //   namaitem:'namaitem',
  //   jumlahitem:'jumlahitem',
  //   iduser:'iduser',
  //   idsession:'idsession',

// }
  
//       
   
      //  axios({
      //                   method: 'post',
      //                   url: baseURL,
      //                   data: x,
      //                   headers: { "Content-Type": "multipart/form-data" },
      //                   // message: 'berhasil terupload', \
      //                 })
                    
      //                   .then(function (response) {
      //                      console.log(response);
      //                    })
      //                    .catch(function (error) {
      //                      console.log(error);
      //                  });
                    // }
  


                       {/* <TableContainer component={Paper}>
 <Table sx={{ minWidth: 650 }} aria-label="simple table">


        <TableHead>
        <TableRow>
        
 <TableCell>iditem</TableCell>
 <TableCell>namaitem</TableCell>  
 <TableCell>jumlahitem</TableCell>
 <TableCell>iduser</TableCell>
 <TableCell>idsession</TableCell>


            </TableRow>
            </TableHead>
            <TableBody>

     {
         movies.length
         ?
         movies.map((movie, index) => (
             <TableRow key={index}>

                 <TableCell name='iditem' onChange={changeIditem} scope="row">{ index + 1 }</TableCell>
                 <TableCell name='namaitem' onChange={changeNamaitem}  >{ movie.namaitem }</TableCell>
                 <TableCell name='jumlahitem' onChange={changeJumlahitem} ><span className="badge bg-warning text-dark" >{ movie.jumlahitem }</span></TableCell>
                 <TableCell name='iduser' onChange={changeIduser} >{ movie.iduser }</TableCell>
                 <TableCell name='idsession' onChange={changeIdsession} >{ movie.idsession }</TableCell>
                
             </TableRow> 
         
         ))
         : */}
         
             <td colSpan="5" className="text-center">No Movies Found.</td>
          
             {/* } */}
          {/* </TableBody>    */}
            
            
                  
                   
        {/* // </Table> */}
        {/* // </TableContainer> */}