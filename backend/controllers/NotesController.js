import Notes from "../models/NotesModel.js";

// GET
async function getNotes(req, res) {
  try {
    const response = await Notes.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

// GET
async function getNotesById(req, res) {
  try {
    const response = await Notes.findOne({
      where:{
        id: req.params.id
      }
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

// CREATE
async function createNotes(req, res) {
  try {
    const inputResult = req.body;
    await Notes.create(inputResult);
    res.status(201).json({ msg: "Notes Created" });
  } catch (error) {
    console.log(error.message);
  }
}

export { getNotes, createNotes, getNotesById };


export const updateNotes = async (req, res) => {
  try {
    await Notes.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ msg: "Notes Updated" });
  }
  catch (error) {
    console.log(error.message);
  }
}

export const deleteNotes = async (req, res) => {
  try {
    const result = await Notes.destroy({
      where: {
        id: req.params.id
      }
    });
    if (result === 0) {
      res.status(404).json({ msg: "Notes Not Found" });
    } else {
      res.status(200).json({ msg: "Notes Deleted" });
    }
  }
  catch (error) {
    console.log(error.message);
  }
}