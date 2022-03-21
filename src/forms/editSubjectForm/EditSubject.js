import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

//mui
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, TextField } from '@mui/material'

//custom styling
import style from '../form.module.css'

// editSubjectData
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIsEditClicked, setIsMainPartReload, setIsModalOpen } from '../../reducers/editSubjectStore';


function EditSubject() {
  let navigate = useNavigate();
  const { value } = useSelector((state)=> state.editSubjectData);
  const { isEditClicked } = useSelector((state)=> state.editSubjectData);
  const dispatch = useDispatch();  


  console.log(value)

  // for exam details statr
  
  const [paperType, setpaperType] = useState(value.exam)
  const [paperTypeError, setpaperTypeError] = useState(false)

  const [paperYear, setpaperYear] = useState(value.year)
  const [paperYearError, setpaperYearError] = useState(false)

  const [paperDetails, setpaperDetails] = useState(value.AboutPaper)

  // for radio group state

  const [sem, setSem] = useState(value.sem)
  const [avilableSub, setAvilableSub] = useState(["math", "chemistry", "basic"])
  const [selectedSub, setSelectedSub] = useState(value.subject)

  //key for operation

  const [opKEY, setOpKEY] = useState('');
  const [opkeyError, setOpkeyError] = useState(false)

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
    setOpkeyError(false)


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

    if (opKEY === '') {
      setOpkeyError(true)
    }

    if (sem && selectedSub && paperType && paperYear && opKEY ) {
      setLoadingBtn('disabled')
      console.log(sem, selectedSub, paperType, paperYear, paperDetails)

      fetch('http://localhost:8000/post/edit', {
        method: 'PUT',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ _id:value._id, sem, subject: selectedSub, exam: paperType, year: paperYear, AboutPaper: paperDetails, operationKey: opKEY })
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          setLoadingBtn('contained');
          navigate('/');   
          dispatch(setIsEditClicked(!isEditClicked));   
          dispatch(setIsMainPartReload(true));
          dispatch(setIsModalOpen(false))
      })
      .catch((err) => {
            setLoadingBtn('contained')
            console.log(err)
            dispatch(setIsEditClicked(!isEditClicked));      
            dispatch(setIsModalOpen(false));
      })

    }

  }
  return (

    <div className={style.formContainerEdit}>
      <form noValidate autoComplete='off' onSubmit={handelSubmit}>

        <div className={style.containerControl}>
          {/* first radio groups for sem & subject */}

          <div className={style.radioGroup}>
            <FormControl>
              <FormLabel>Semister</FormLabel>
              <RadioGroup
                defaultValue={value.sem}
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
                defaultValue={value.subject}
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

            <div className={style.paperDetailsEdit}>
              <TextField
                defaultValue={value.exam}
                onChange={(e) => setpaperType(e.target.value)}
                className={style.inputSectionsEdit}
                style={{margin:"10px 0"}}
                label="Paper Type"
                variant="outlined"
                color='secondary'
                fullWidth
                required
                error={paperTypeError}
              />
              <TextField
              defaultValue={value.year}
              onChange={(e) => setpaperYear(e.target.value)}
              className={style.inputSectionsEdit}
              style={{margin:"10px 0"}}
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
            
            <div className={style.detailsSectionEdit}>
            <TextField
            defaultValue={value.AboutPaper}
              onChange={(e) => setpaperDetails(e.target.value)}
              className={style.inputSectionsEdit}
              style={{margin:"10px 0"}}
              label="Paper Details"
              variant="outlined"
              color='secondary'
              fullWidth
            />
            </div>

            <div className={style.detailsSectionEdit}>
              <TextField
              defaultValue={''}
                onChange={(e) => setOpKEY(e.target.value)}
                className={style.inputSectionsEdit}
                style={{margin:"10px 0"}}
                label="key"
                variant="outlined"
                color='secondary'
                fullWidth
                required
                error={opkeyError}
              />
            </div>
          </div>
        </div>

        {/* fourth the submit button */}

        <Button
          className={style.btn}
          type="submit"
          variant={loadingBtn}
          color="secondary"
        >
          Update
        </Button>
      </form>
    </div>
  )
}

export default EditSubject;