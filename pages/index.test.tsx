import renderer from 'react-test-renderer'
import Home from './index'

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: () => ({ isLoading: true, data: undefined }),
}))

describe('Home page', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<Home />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
