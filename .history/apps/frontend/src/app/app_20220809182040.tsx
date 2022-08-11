// eslint-disable-next-line @typescript-eslint/no-unused-vars

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Textarea } from '@material-tailwind/react';

export function App() {
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [editarModal, setEditarModal] = useState(false);
  const [title, setAddTarea] = useState('');
  const [description, setAddDescripcion] = useState('');
  const [status, setAddStatus] = useState('Pending');
  const [datos, setDatos] = useState([]);
  const [tarea, setTarea] = useState<any>([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const fetch = await axios.get('http://localhost:3333/api/datos');
        const { data } = fetch;
        setDatos(data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    const datos = { title, description, status };
    const data = await axios.post('http://localhost:3333/api/datos', datos);
    console.log(data);
  };
  const eliminarModal = async (id: any) => {
    await axios.delete(`http://localhost:3333/api/datos/${id}`);
    window.location.reload();
  };
  const editarTask = () => {
    setEditarModal(!editarModal);
    const hola = await axios.patch(`http://localhost:3333/api/datos/${id}`);
  };
  const mostrarDatos = (a: any) => {
    setTarea(a);
    setShowModalInfo(true);
  };
  return (
    <div>
      {datos ? (
        <>
          <div className="flex mt-4 justify-end px-4">
            <button
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-teal-700 hover:bg-teal"
              onClick={() => setShowModalAdd(true)}
            >
              Create new task
            </button>
          </div>
          <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
            <div className="bg-white rounded shadow p-6 m-4 w-full lg:max-w-4xl">
              <div className="mb-4 text-center">
                <h1 className="text-grey-darkest text-4xl">Todo List</h1>
              </div>
              <div>
                <div className="flex mb-4 justify-between">
                  <p>Name</p>
                  <p>Descripcion</p>
                  <p>Status</p>
                </div>

                {datos.map((a: any, i) => (
                  <div id={a._id} key={i}>
                    <div className="flex mb-4 justify-between">
                      <button
                        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => mostrarDatos(a)}
                      >
                        {a.name}
                      </button>
                      <div>
                        <p>{a.description}</p>
                      </div>
                      <p>{a.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="flex flex-col items-center">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              1
            </span>{' '}
            to{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              10
            </span>{' '}
            of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              100
            </span>{' '}
            Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <svg
                aria-hidden="true"
                className="mr-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Prev
            </button>
            <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
              <svg
                aria-hidden="true"
                className="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div> */}
            </div>
          </div>
          <div>
            {showModalInfo && tarea ? (
              <>
                <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-full my-6 mx-auto max-w-3xl ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between  p-5 border-b border-solid border-slate-200 rounded-t">
                        <input
                          className="text-5xl font-semibold w-full"
                          disabled={editarModal}
                          value={tarea.name}
                        />
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModalInfo(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      <div className="relative p-6 flex-auto">
                        <Textarea
                          disabled={editarModal}
                          className="my-4 w-full disabled text-slate-500 text-lg leading-relaxed"
                          onChange={(e) => setAddDescripcion(e.target.value)}
                        >
                          {tarea.description}
                        </Textarea>
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                          Status: {tarea.status}
                        </p>
                        <label className="block mt-3 mb-1 text-sm font-medium text-gray-900 dark:text-gray-400">
                          Escoge el status
                        </label>
                        <select
                          id="status"
                          name="status"
                          onChange={(e) => setAddStatus(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400 dark:text-stone-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option defaultValue={'Pending'}>
                            Selecciona una opcion
                          </option>
                          <option value="In progress">In Progress</option>
                          <option value="Done">Done</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => eliminarModal(tarea._id)}
                        >
                          Eliminar
                        </button>
                        {editarModal ? (
                          <button
                            className="bg-sky-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => editarTask()}
                          >
                            Editar
                          </button>
                        ) : (
                          <button
                            className="bg-emerald-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => editarTask()}
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
          <div>
            {showModalAdd ? (
              <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Agrega una nueva tarea
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModalAdd(false)}
                          >
                            <span className=" text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              X
                            </span>
                          </button>
                        </div>
                        <div className="relative p-6 flex-auto">
                          <input
                            id="tarea"
                            name="tarea"
                            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker mb-4"
                            placeholder="Nombre de la tarea"
                            onChange={(e) => setAddTarea(e.target.value)}
                          />
                          <input
                            id="descripcion"
                            name="descripcion"
                            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker mb-4"
                            placeholder="Descripcion"
                            onChange={(e) => setAddDescripcion(e.target.value)}
                          />
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModalAdd(false)}
                          >
                            Cerrar
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                          >
                            Agregar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </form>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
