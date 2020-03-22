CREATE TABLE patients
(
    id integer NOT NULL,
    patient_hash text NOT NULL
);
CREATE TABLE symptoms
(
    id integer NOT NULL,
    patient_id integer NOT NULL,
    report_time timestamp
    without time zone DEFAULT now
    () NOT NULL,
    postal_code text,
    symptom jsonb,
);
