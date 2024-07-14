import axios, { AxiosError } from "axios";
import { history } from "../App";
import { ICategoria } from "../interfaces/ICategoria";
import { ILivro } from "../interfaces/ILivro";
import { IAutor } from "../interfaces/IAutor";
import { IPedido } from "../interfaces/IPedido";

const http = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    Accept: "application/json",
    Content: "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    if (error.response?.status === 401) {
      history.push("/");
      return Promise.reject();
    }
    return Promise.reject(error);
  }
);

export default http;

export const obterPedidos = async () => {
  const resposta = await http.get<IPedido[]>("pedidos");
  return resposta.data;
};

export const obterCategorias = async () => {
  const resposta = await http.get<ICategoria[]>("categorias");
  return resposta.data;
};

export const obterLivros = async (categoriaId: number) => {
  const resposta = await http.get<ILivro[]>("livros", {
    params: {
      categoria: categoriaId,
    },
  });
  return resposta.data;
};

export const obterAutor = async (autorId: number) => {
  try {
    const resposta = await http.get<IAutor>(`autores/${autorId}`);
    return resposta.data;
  } catch (error) {
    console.log("Não foi possivel obter o autor!");
    console.log(error);
  }
};

export const obterCategoria = async (slug: string) => {
  const resposta = await http.get<ICategoria[]>("categorias", {
    params: {
      slug,
    },
  });
  return resposta.data[0];
};

export const obterLivro = async (slug: string) => {
  const resposta = await http.get<ILivro[]>("livros", {
    params: {
      slug,
    },
  });
  if (resposta.data.length === 0) {
    return null;
  }
  return resposta.data[0];
};

export const obterLivrosDestaque = async (tipo: string) => {
  const resposta = await http.get<ILivro[]>(`public/${tipo}`);
  return resposta.data;
};
