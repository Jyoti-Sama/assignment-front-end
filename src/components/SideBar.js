import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';

import style from '../style.module.css'

import { useDispatch, useSelector } from 'react-redux';
import { setSubjectData } from '../reducers/subjectStore';
import { setIsMainPartReload } from '../reducers/editSubjectStore';

export default function SideBar() {
    const { isMainPartReloaded } = useSelector((state) => state.editSubjectData);
    const dispatch = useDispatch();


    const [sem, setSem] = useState('sem_06')
    const [avilableSub, setAvilableSub] = useState(["math", "chemistry", "basic"])
    const [selectedSub, setSelectedSub] = useState('')
    const [loadingBtn, setLoadingBtn] = useState('contained')

    const searchAssignment = () => {
        if (sem === "") {
            alert("please select sem")
        }
        if (selectedSub === "") {
            alert("please select subject")
        }
        if (sem && selectedSub) {
            setLoadingBtn('disabled')
            console.log(sem, selectedSub);
            fetch('http://localhost:8000/post/test', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ sem, subject: selectedSub })
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    setLoadingBtn('contained');
                    dispatch(setSubjectData(data))
                })
                .catch((err) => {
                    setLoadingBtn('contained')
                    console.log(err)
                })
        }


    }

    useEffect(() => {
        validSubChoise()
    }, [sem])

    //subject of every semester
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

    if (isMainPartReloaded) {
        searchAssignment();
        dispatch(setIsMainPartReload(false));
    }

    return (
        <div>
            <div className={style.side_bar}>
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
            <div className={style.search_btm}>
            <Button
                className={style.search_btm}
                onClick={(e) => searchAssignment(e)}
                variant={loadingBtn}
                color="secondary"
            >
                search
            </Button>
            </div>
        </div>
    );
}
