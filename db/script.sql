CREATE TABLE bruxo (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    datadenascimento DATE,
    idade INT NOT NULL,
    casaH VARCHAR(100) NOT NULL,
    habilidadeE VARCHAR(100) NOT NULL,
    sangue VARCHAR(100) NOT NULL,
    patrono VARCHAR(100)
);

CREATE TABLE varinha(
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    comprimento INT NOT NULL,
    nucleo VARCHAR(100) NOT NULL,
    dataF DATE NOT NULL
);