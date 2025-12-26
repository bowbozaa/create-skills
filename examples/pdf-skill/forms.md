# PDF Form Filling

This document describes how to fill out PDF forms using the included Python script.

## Usage

When a user requests to fill out a PDF form, Claude should:

1. Use the `extract_form_fields.py` script to identify all form fields
2. Map user-provided data to the form fields
3. Use a PDF library to fill in the values
4. Save the completed PDF

## Example

```python
# extract_form_fields.py usage
python extract_form_fields.py input.pdf
```

