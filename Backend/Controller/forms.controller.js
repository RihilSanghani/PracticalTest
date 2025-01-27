import Form from '../Models/Form.models.js';

export const saveForm = async (req, res) => {
  try {
    const { form_name, form_data } = req.body;

    if (!req.user.id) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    if (!form_data && !form_name) {
      return res.status(400).json({ message: 'Form data and form name are required' });
    }

    const form = new Form({ user_id: req.user._id, form_name, form_data });

    await form.save();

    res.status(200).json({ id: form._id, message: 'Form saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save form' });
  }
};

export const getForms = async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    const forms = await Form.find({ user_id: req.user.id });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch forms' });
  }
};

export const getForm = async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    const form = await Form.findById(req.params.id);
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch form' });
  }
};

export const updateForm = async (req, res) => {
  try {
    const { form_name, form_data } = req.body;
    if (!req.user.id) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    if (!form_data && !form_name) {
      return res.status(400).json({ message: 'Form data and form name are required' });
    }

    const updatedForm = await Form.findByIdAndUpdate(req.params.id,
      {
        $set: { form_data: req.body.form_data, form_name: req.body.form_name },
        $inc: { submissions: 1 }
      },
      { new: true }
    );

    res.status(200).json({ id: updatedForm.id, message: 'Form updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update form' });
  }
};
