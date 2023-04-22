import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import css from 'components/Styles.module.css';
import Button from 'components/Button/Button';
import pixabayApi from 'components/Api/Api';

import Modal from 'components/Modal/Modal';
import Spinner from 'components/Loader/Spinner';
import Notiflix from 'notiflix';

export default class App extends Component {
  state = {
    status: 'idle',
    query: [],
    page: 1,
    name: '',
    modalAlt: '',
    showModal: false,
    modalImg: '',
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.name;
    const nextQuery = this.state.name;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (nextPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }

    if (prevQuery !== nextQuery) {
      this.setState({ query: [], status: 'pending' });
    }

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      pixabayApi
        .fetchQuery(nextQuery, nextPage)
        .then(({ hits }) => {
          const images = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return { id, webformatURL, largeImageURL, tags };
            }
          );
          // console.log(images);
          if (images.length > 0) {
            this.setState(prevState => {
              return {
                query: [...prevState.query, ...images],
                status: 'resolved',
              };
            });
          } else {
            Notiflix.Notify.failure(
              `По запиту ${nextQuery} нічого не знайдено.`
            );
            this.setState({ status: 'idle' });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleSubmitInput = newQuery => {
    if (newQuery !== this.state.name) {
      this.setState({ name: newQuery, page: 1, status: 'pending' });
    }
  };

  handleClickImg = event => {
    const imgForModal = event.target.dataset.src;
    const altForModal = event.target.alt;
    this.setState({
      showModal: true,
      modalImg: imgForModal,
      modalAlt: altForModal,
    });
  };

  handleClickBtn = () => {
    this.setState(({ page }) => {
      return { page: page + 1, status: 'pending' };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { query, showModal, modalImg, modalAlt, error, status, page } =
      this.state;

    if (status === 'idle') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmitInput} />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmitInput} />
          {query.length > 0 && <ImageGallery query={query} />}
          <Spinner className={css.Loader} />
        </div>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={modalImg} alt={modalAlt} />
            </Modal>
          )}
          <div>
            <Searchbar onSubmit={this.handleSubmitInput} />
            <ImageGallery
              onClickImg={this.handleClickImg}
              query={this.state.query}
            />
            {query.length / 12 === page && (
              <Button handleClickBtn={this.handleClickBtn} />
            )}
          </div>
        </>
      );
    }
  }
}
