'use client'

import type { shops as Shop } from 'prisma/generated/client-api'
import {
  Alert, Button, Col, Form, Row,
} from 'react-bootstrap'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import React, { useState } from 'react'
import FormError from '@/components/Form/FormError'

type Inputs = {
  shopify_domain: string;
  name: string;
};

type Props = {
  shop?: Shop;
};

export default function ShopForm(props: Props) {
  const { shop } = props
  const [alertClass, setAlertClass] = useState('success')
  const defaultValues = (): Inputs => {
    if (shop) {
      return {
        shopify_domain: shop.shopify_domain,
        name: shop.name!,
      }
    }
    return {
      shopify_domain: '',
      name: '',
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: defaultValues(),
  })
  const [submitting, setSubmitting] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  const onSubmit: SubmitHandler<Partial<Shop>> = async (data) => {
    setSubmitting(true)
    let response: Response
    if (!shop) {
      response = await fetch('/api/shops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } else {
      response = await fetch(`/api/shops/${shop.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    }
    if (response.status !== 200) {
      setNotificationMessage('Unexpected error occurred, please try again.')
      setAlertClass('danger')
    } else {
      setNotificationMessage('Record updated successfully.')
    }
    setSubmitting(false)
    window.scrollTo(0, 0)
  }
  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Alert
        variant={alertClass}
        show={notificationMessage !== ''}
        onClose={() => setNotificationMessage('')}
        dismissible
      >
        {notificationMessage}
      </Alert>
      <Form.Group className="mb-3">
        {/* generate for Shop name */}
        <Form.Label>Name</Form.Label>
        {shop ? (
          <Form.Control
            type="text"
            {...register('name', { required: 'This field is required' })}
            defaultValue={shop ? shop.name! : undefined}
            isInvalid={!!errors.name}
            disabled={!!shop}
          />
        ) : (
          <Form.Control
            type="text"
            {...register('name', { required: 'This field is required' })}
            value={undefined}
            isInvalid={!!errors.name}
          />
        )}
        <FormError message={errors.name?.message} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Shopify Domain</Form.Label>
        {shop ? (
          <Form.Control
            type="text"
            {...register('shopify_domain', { required: 'This field is required' })}
            defaultValue={shop ? shop.shopify_domain : undefined}
            isInvalid={!!errors.shopify_domain}
            disabled={!!shop}
          />
        ) : (
          <Form.Control
            type="text"
            {...register('shopify_domain', { required: 'This field is required' })}
            value={undefined}
            isInvalid={!!errors.shopify_domain}
          />
        )}
        <FormError message={errors.shopify_domain?.message} />
      </Form.Group>
      {/* <Form.Group className="mb-3">
        <Form.Label>Is Test</Form.Label>
        <Form.Check type="checkbox" defaultChecked={shop?.is_test ?? false} {...register("is_test")}/>
      </Form.Group> */}

      <Button className="me-3" type="submit" variant="success" disabled={submitting}>
        Submit
      </Button>
      <Button type="button" variant="secondary" onClick={() => reset()}>
        Reset
      </Button>
    </Form>
  )
}
