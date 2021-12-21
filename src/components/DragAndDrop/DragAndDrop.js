import React from 'react'
import { Container, Row } from 'react-bootstrap'
import './DragAndDrop.css';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';



function DragAndDrop() {
    const defaultArray=[
        {
            id:1,
            title:'Sample List style',
            image:'sm1.jpg'
        },
        {
            id:2,
            title:'Sample List style',
            image:'sm2.png'
        },
        {
            id:3,
            title:'Sample List style',
            image:'sm3.png'
        },
        {
            id:4,
            title:'Sample List style',
            image:'sm4.png'
        },
        {
            id:5,
            title:'Sample List style',
            image:'sm5.png'
        },
    ]

    return (
        <Container className="drag_and_drop">
            <h1>Drag and drop</h1>
            <Row>
            <DragDropContext>
                <Droppable droppableId="characters">
                {(provided)=>(
                <ul className="col-lg-4" {...provided.droppableProps} ref={provided.innerRef}>
                    {
                        defaultArray.map((dt,index)=>{
                            return (
                                <Draggable key={dt.id} draggableId={dt.id} index={index}>
                                {(provided)=>(
                                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                        <div>
                                            <img src={`/media/${dt.image}`} alt={dt.title} />
                                        </div>
                                        <p>{dt.title} {index+1}</p>
                                    </li>
                                )}
                                
                                </Draggable>
                            );
                        })
                    }
                    {provided.placeholder}
                </ul>
                )}       
                </Droppable>
                </DragDropContext>
                <ul className="col-lg-4">
                    <li>List style 1</li>
                    <li>List style 2</li>
                    <li>List style 3</li>
                    <li>List style 4</li>
                    <li>List style 5</li>
                    <li>List style 6</li>
                    <li>List style 7</li>
                    <li>List style 8</li>
                </ul>
                <ul className="col-lg-4">
                    <li>List style 1</li>
                    <li>List style 2</li>
                </ul>
            </Row>
            
            
        </Container>
    )
}

export default DragAndDrop
