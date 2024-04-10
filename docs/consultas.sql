-- En este archivo deben estar tus ejercicios de consultas sql

-- 1) **Empleados ordenados alfabéticamente (Z...A):**  
select NOMBRES from EMPLEADOS order by NOMBRES desc

--2) **Empleados de Soporte:**

select e.NOMBRES, p.PUESTO, l.LOCALIDAD 
from EMPLEADOS as e 
join DEPARTAMENTOS as d on e.DEPARTAMENTO_ID = d.ID 
join LOCALIDADES as l on d.LOCALIDAD_ID = l.ID 
join PUESTOS as p on e.PUESTO_ID = p.ID
where PUESTO = 'Soporte'

--3)**Nombres que terminan con 'o':**  

select NOMBRES from EMPLEADOS where NOMBRES like '%o'

--4) **Empleados en Carlos Paz:**

select e.NOMBRES, e.SUELDO, l.LOCALIDAD 
from EMPLEADOS as e 
join DEPARTAMENTOS as d on e.DEPARTAMENTO_ID = d.ID 
join LOCALIDADES as l on d.LOCALIDAD_ID = l.ID 
where l.LOCALIDAD = 'Carlos Paz' 

--5) **Sueldos entre 10000 y 13000:**

select e.NOMBRE, e.SUELDO, l.LOCALIDAD 
from EMPLEADOS as e
join DEPARTAMENTOS as d on e.DEPARTAMENTO_ID = d.ID 
join LOCALIDADES as l on d.LOCALIDAD_ID = l.ID 
where e.SUELDO between 10000 and 13000

--6) **Departamentos con más de 5 empleados:**  

select d.* 
from DEPARTAMENTOS as d
join EMPLEADOS as e on d.ID = e.DEPARTAMENTO_ID
group by DENOMINACION 
having count(*) > 5 

--7) **Empleados en Córdoba con puesto de Analista o Programador:**  

select e.NOMBRES 
from EMPLEADOS as e 
join DEPARTAMENTOS as d on e.DEPARTAMENTO_ID = d.ID 
join LOCALIDADES as l on d.LOCALIDAD_ID = l.ID 
join PUESTOS as p on e.PUESTO_ID = p.ID
where LOCALIDAD = 'Córdoba' and (PUESTO = 'Analista' or PUESTO = 'Programador')

--8) **Sueldo medio de todos los empleados:**  

select avg(SUELDO) as Sueldo_Medio
from EMPLEADOS

--9)  **Máximo sueldo en el departamento 10:**  

select max(e.SUELDO) as Maximo_Sal
from  EMPLEADOS as e  
where DEPARTAMENTO_ID = 10

--10)  **Sueldo mínimo en el departamento Soporte:** 

select min(e.SUELDO) as  Minimo_Sal
from EMPLEADOS as e 
join  DEPARTAMENTOS as d on e.DEPARTAMENTO_ID=d.ID 
where d.DENOMINACION like 'Soporte'

--11)  **Suma de sueldos por puesto:**

select p.PUESTO, sum(SUELDO) as Suma_salarios
from EMPLEADOS as e
join PUESTOS as p on e.PUESTO_ID = p.ID 