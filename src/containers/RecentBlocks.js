import { connect } from 'react-redux';
import { reloadRecentBlocks } from '../slices/recentBlocks';
import RecentBlocks from '../components/RecentBlocks';

const mapStateToProps = state => ({
  blocks: state.recentBlocks.blocks,
  isFetchingBlocks: state.recentBlocks.fetching,
});

const mapDispatchToProps = dispatch => ({
  reloadRecentBlocks: () => dispatch(reloadRecentBlocks()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentBlocks);
