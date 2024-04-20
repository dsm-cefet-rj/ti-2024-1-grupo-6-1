import projectActionTypes from "./actionTypes";

const initialState = {
    projetos: {},
    projeto: null,
    servicos: [],
    formularioProjeto: false,
    formularioServico: false,
    mensagem: '',
    tipo: '',

}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case projectActionTypes.INSERT:
            return { ...state, projetos: action.payload }
        case projectActionTypes.DELET:
            return { ...state, projetos: state.projetos.filter((projeto) => projeto.id !== action.payload) }
        case 'setProjeto':
            return { ...state, projeto: action.payload }
        case 'setServicos':
            return { ...state, servicos: action.payload }
        case "setFormularioProjeto":
            return { ...state, formularioProjeto: !state.formularioProjeto }
        case "setFormularioServico":
            return { ...state, formularioServico: !state.formularioServico }
        case "setMensagem":
            return { ...state, mensagem: action.payload }
        case "setTipo":
            return { ...state, tipo: action.payload }
        default:
            return state
    }
}


export default projectReducer;