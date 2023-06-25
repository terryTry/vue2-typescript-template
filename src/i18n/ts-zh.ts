const req = require.context('./zh', true, /\.js$/)
const requireAll = (requireContext) =>
    requireContext.keys().map((key) => {
        return requireContext(key).default
    })
const transMap = requireAll(req)

const translations = {
}

Object.assign(translations, ...transMap)
export default translations
