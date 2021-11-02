import react, { useState } from 'react';

import React from 'react';


const ChecklistForm = () => {
    const [task, setTask] = useState({
        taskName: "",
        isComplete: false

    })
    const [listOfTasks, setListOfTasks] = useState([])

    const changehandler = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const submitTask = (e) => {
        e.preventDefault()
        setListOfTasks([...listOfTasks, task]);

        //reset the form (clear)
        setTask({
            taskName: "",
            isComplete: false
        })
    }
    const completeTask = (e,taskIndex) => {
        let [...updatedListOfTasks] = listOfTasks
        console.log("This is the complete task function", updatedListOfTasks)
        updatedListOfTasks[taskIndex].isComplete = !updatedListOfTasks[taskIndex].isComplete
        setListOfTasks(updatedListOfTasks)

    }
    const deleteTask = (e,taskIndex) => {

        let listofTasksAfterDelete = listOfTasks.filter((eachTask, i)=>{
            return i != taskIndex
        })
        setListOfTasks(listofTasksAfterDelete)
    }

    return (
        <>
            <form onSubmit={submitTask}>
                <div className="form-group text-center mt-2 col-lg-6 offset-lg-3 mt-4">
                    <input className="form-control" type="text" placeholder="Please type the name of the task!" value={task.taskName} name="taskName" onChange={changehandler} />

                    {
                        task.taskName.length < 10 && task.taskName.length > 0 ?
                            <p className="text-danger">Please type the name of task!</p>
                            : ""
                    }
                </div>
                <div className="text-center mt-3"><input className="btn btn-primary" type="submit" value="Add" /></div>
            </form>


            <h2 class="text-center text-dark mt-3"> ****List of Tasks!****</h2>
            <hr />

            {
                listOfTasks.map((eachTask, taskIndex) => {
                    return (
                        <div key={taskIndex} >
                            <div className="mt-3" >
                                {/* // extra call back parameter to know what index we clicked on */}
                                <h2 style = {{textDecoration: eachTask.isComplete? "line-through" : "none"}} className="text-center text-align-center text-info">{eachTask.taskName} <input onClick={(e)=>completeTask(e,taskIndex)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input></h2>
                                <button onClick={(e)=>deleteTask(e,taskIndex)} className="btn btn-dark">Delete Task</button>
                                
                                <hr />
                            </div>

                        </div>

                    )
                })
            }
        </>
    );
};
export default ChecklistForm;