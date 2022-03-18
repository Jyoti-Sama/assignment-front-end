import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import FileBase from 'react-file-base64';

//mui
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, TextField } from '@mui/material'

//custom styling
import style from './form.module.css'



function SubjectAdd() {

  let navigate = useNavigate();

  // for exam details statr

  const [paperType, setpaperType] = useState('')
  const [paperTypeError, setpaperTypeError] = useState(false)

  const [paperYear, setpaperYear] = useState('')
  const [paperYearError, setpaperYearError] = useState(false)

  const [paperDetails, setpaperDetails] = useState('')

  // for radio group state

  const [sem, setSem] = useState('sem_06')
  const [avilableSub, setAvilableSub] = useState(["math", "chemistry", "basic"])
  const [selectedSub, setSelectedSub] = useState('')

  // for image uploading

  const [imageData, setImageData] = useState('')

  // for submit botton state

  const [loadingBtn, setLoadingBtn] = useState('contained')

  //for update subject choise section as soon sem option changes

  useEffect(() => {
    validSubChoise()
  }, [sem])

  //it fires when sem changes && it contains subjects of every semester

  const validSubChoise = () => {
    switch (sem) {
      case "sem_01": setAvilableSub(["math", "chemistry", "basic"])
        break;
      case "sem_02": setAvilableSub(["math", "chemistry", "basic"])
        break;
      case "sem_03": setAvilableSub(["math", "chemistry", "basic"])
        break;
      case "sem_04": setAvilableSub(["math", "chemistry", "basic"])
        break;
      case "sem_05": setAvilableSub(["math", "chemistry", "basic"])
        break;
      case "sem_06": setAvilableSub(["control", "bioMedical", "computerNetwork"])
        break;
      case "sem_07": setAvilableSub(["math", "chemistry", "basic"])
        break;
      case "sem_08": setAvilableSub(["math", "chemistry", "basic"])
        break;
      default:
        break;
    }
  }

  // for form submit action

  const handelSubmit = (e) => {
    
    e.preventDefault();

    setpaperTypeError(false)
    setpaperYearError(false)

    if (paperType === '') {
      setpaperTypeError(true)
    }

    if (paperYear === '') {
      setpaperYearError(true)
    }    

    if (sem === '') {
      alert("please choose the sem")
    }

    if (selectedSub === '') {
      alert("please choose a subject")
    }

    if (imageData.image.base64 === ""){
      alert("please select a image")
    }

    if (sem && selectedSub && paperType && paperYear && imageData) {
      setLoadingBtn('disabled')
      console.log(sem, selectedSub, paperType, paperYear, paperDetails, imageData)

      fetch('http://localhost:8000/post', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ sem, subject: selectedSub, exam: paperType, year: paperYear, AboutPaper: paperDetails, paperImage: imageData.image.base64})
      }).then(() => {
        console.log(paperType, paperYear)
        navigate("/");
        setLoadingBtn('contained')
      }).catch(() => setLoadingBtn('contained'))

    }

  }


  return (

    <div className={style.formContainer}>
      <form noValidate autoComplete='off' onSubmit={handelSubmit}>

        <div className={style.containerControl}>
          {/* first radio groups for sem & subject */}

          <div className={style.radioGroup}>
            <FormControl>
              <FormLabel>Semister</FormLabel>
              <RadioGroup
                defaultValue={"sem_06"}
                name="radio-buttons-group"
                onChange={(e) => {
                  setSem(e.target.value);
                  validSubChoise();
                }}
              >
                <FormControlLabel value="sem_01" control={<Radio />} label="1st sem" />
                <FormControlLabel value="sem_02" control={<Radio />} label="2nd sem" />
                <FormControlLabel value="sem_03" control={<Radio />} label="3rd sem" />
                <FormControlLabel value="sem_04" control={<Radio />} label="4th sem" />
                <FormControlLabel value="sem_05" control={<Radio />} label="5th sem" />
                <FormControlLabel value="sem_06" control={<Radio />} label="6th sem" />
                <FormControlLabel value="sem_07" control={<Radio />} label="7th sem" />
                <FormControlLabel value="sem_08" control={<Radio />} label="8th sem" />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>subjects</FormLabel>
              <RadioGroup
                defaultValue={""}
                name="radio-buttons-group2"
                onChange={(e) => setSelectedSub(e.target.value)}
              >
                {avilableSub.map((item, index) => {
                  return (
                    <FormControlLabel key={index} value={item} control={<Radio />} label={item} />)
                })}

              </RadioGroup>
            </FormControl>
          </div>

          <div>
            {/* second the subject type & paper Year */}

            <div className={style.paperDetails}>
              <TextField
                onChange={(e) => setpaperType(e.target.value)}
                className={style.inputSections}
                label="Paper Type"
                variant="outlined"
                color='secondary'
                fullWidth
                required
                error={paperTypeError}
              />

              <TextField
                onChange={(e) => setpaperYear(e.target.value)}
                className={style.inputSections}
                label="Paper Year"
                variant="outlined"
                color='secondary'
                type={"number"}
                fullWidth
                required
                error={paperYearError}
              />
            </div>

            {/* third the paper details  */}

            <TextField
              onChange={(e) => setpaperDetails(e.target.value)}
              className={style.inputSections}
              label="Paper Details"
              variant="outlined"
              color='secondary'
              fullWidth
            />

            <FileBase
              type="file"
              multiple={false}
              onDone={(base64) => setImageData({ image: base64 })}
            />

          </div>
        </div>

        {/* fourth the submit button */}

        <Button
          className={style.btn}
          type="submit"
          variant={loadingBtn}
          color="secondary"
        >
          Add
        </Button>
      </form>
    </div>
  )
}

export default SubjectAdd;