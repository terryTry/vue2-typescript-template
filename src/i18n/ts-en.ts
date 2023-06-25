const req = require.context('./en', true, /\.js$/)
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
    requireContext.keys().map((key: any) => {
        return requireContext(key).default
    })
const transMap = requireAll(req)

const translations = {
}

Object.assign(translations, ...transMap)
export default translations
