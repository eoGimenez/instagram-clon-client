import { useEffect } from 'react';
import { useField } from '../../../hooks/useField';
import { useResponse } from '../../../hooks/useResponse';
import './NewResponse.css';

export default function NewResponse({ user, commentId, handleResponse }) {
  const text = useField({ type: 'text', field: '' });
  const { createResponse } = useResponse();

  /* 	const handleResponse = (e) => {
		e.preventDefault();
		createResponse({
			text: text.value,
			commentId: commentId,
			userId: user.id,
			username: user.username,
		});
	}; */
  return (
    <>
      {user && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleResponse({ text: text.value, commentId: commentId });
          }}
          className='new--response--form'
        >
          <fieldset>
            <input {...text} placeholder='Escriba su respuesta' />
          </fieldset>
          <button className='new--response--form--btn' disabled={!text.value}>
            Responder
          </button>
        </form>
      )}
    </>
  );
}
