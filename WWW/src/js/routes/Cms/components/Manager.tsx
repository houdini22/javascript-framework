import * as React from 'react'
import { connect } from 'react-redux'
import { actions, selectors } from '../../../reducers/cms-pages'
import { ifDeepDiff } from '../../../utils/javascript'

export class Manager extends React.Component<null, null> {
    state = {
        collection: [],
    }

    componentDidMount() {
        const { filters, setCurrentId, fetch, setIsLoading, id = 1 } = this.props

        Promise.all([setCurrentId(id)]).then(() => {
            setIsLoading(true).then(() => {
                fetch(filters).then(
                    () => setIsLoading(false),
                    () => {
                        setIsLoading(false)
                    },
                )
            })
        })
    }

    componentDidUpdate(prevProps: Readonly<null>, prevState: Readonly<null>, snapshot?: any) {
        const { filters, fetch, setIsLoading } = this.props

        if (ifDeepDiff(prevProps.filters, filters)) {
            setIsLoading(true).then(() => {
                fetch(filters).then(
                    () => {
                        setIsLoading(false)
                    },
                    () => setIsLoading(false),
                )
            })
        }
    }

    render() {
        const {
            children,
            nodes,
            isLoading,
            currentNode,
            setCurrentId,
            setIsLoading,
            publish,
            unpublish,
            deleteNode,
            currentNodeParents,
            editCategory,
            addCategory,
            addDocument,
            editDocument,
            addLink,
            editLink,
            fetch,
        } = this.props

        const renderProps = {
            nodes,
            isLoading,
            currentNode,
            setCurrentId,
            setIsLoading,
            publish,
            unpublish,
            deleteNode,
            currentNodeParents,
            editCategory,
            addCategory,
            addDocument,
            editDocument,
            addLink,
            editLink,
            fetch,
        }

        return children(renderProps)
    }
}

const mapStateToProps = (state) => ({
    isLoading: selectors.getIsLoading(state),
    nodes: selectors.getNodes(state),
    currentNode: selectors.getCurrentNode(state),
    currentNodeParents: selectors.getCurrentNodeParents(state),
    currentId: selectors.getCurrentId(state),
})

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentId: (id) => dispatch(actions.setCurrentId(id)),
        setIsLoading: (val) => dispatch(actions.setIsLoading(val)),
        publish: (id) => dispatch(actions.publish(id)),
        unpublish: (id) => dispatch(actions.unpublish(id)),
        deleteNode: (node) => dispatch(actions.deleteNode(node)),
        addCategory: (values) => dispatch(actions.addCategory(values)),
        editCategory: (values) => dispatch(actions.editCategory(values)),
        addDocument: (values) => dispatch(actions.addDocument(values)),
        editDocument: (values) => dispatch(actions.editDocument(values)),
        addLink: (values) => dispatch(actions.addLink(values)),
        editLink: (values) => dispatch(actions.editLink(values)),
        fetch: (filters) => dispatch(actions.fetch(filters)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
