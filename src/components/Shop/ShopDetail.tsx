'use client'

import type { Shop } from '@prisma/client'
import {
  Alert, Button, Col, Form, Row,
} from 'react-bootstrap'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import React, { useState } from 'react'
import FormError from '@/components/Form/FormError'
import { getShopDetail, TShopDetail } from '@/app/services/shop_service'

type Inputs = {
};

type Props = {
  shop_detail: TShopDetail;
};

export default function ShopDetail(props: Props) {
  const shopDetail = props.shop_detail
  const [alertClass, setAlertClass] = useState('success')
  const defaultValues = (): Inputs => {
    return {
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
    response = await fetch(`/api/shops/${shopDetail.shop!.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
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
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          defaultValue={shopDetail.shop!.name!}
          disabled={!!shopDetail.shop!}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Shopify Domain</Form.Label>
        <Form.Control
          type="text"
          defaultValue={shopDetail.shop!.shopify_domain!}
          disabled={true}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          defaultValue={shopDetail.shop!.email!}
          disabled={true}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Installed Date</Form.Label>
        <Form.Control
          type="text"
          defaultValue={shopDetail.shop!.created_at!.toString()}
          disabled={true}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Shopify Plan</Form.Label>
        <Form.Control
          type="text"
          defaultValue={shopDetail.shop!.plan_name!.toString()}
          disabled={true}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Is Expert</Form.Label>
        <Form.Check type="checkbox" defaultChecked={shopDetail.shop!.is_expert ?? false} disabled={true} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Is Test</Form.Label>
        <Form.Check type="checkbox" defaultChecked={shopDetail.shop!.is_test ?? false} disabled={true} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Use App Design V3</Form.Label>
        <Form.Check type="checkbox" defaultChecked={shopDetail.shop!.used_v3 ?? false} disabled={true} />
      </Form.Group>
      {/* pricing plan */}
      <Form.Group className="mb-3">
        <Form.Label>Subscription Plan</Form.Label>
        <Form.Control
          type="text"
          defaultValue={shopDetail.shop!?.subscription?.name ?? 'No subscription'}
          disabled={true}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Onboarding ({shopDetail.onboarding?.total_complete}/5)</Form.Label>
        <Row>
          <Col>
            <Form.Check type="checkbox" label="Select Theme" defaultChecked={shopDetail.onboarding?.step_complete.select_theme} disabled={true} />
            <Form.Check type="checkbox" label="Setup Branding" defaultChecked={shopDetail.onboarding?.step_complete.setup_branding} disabled={true} />
            <Form.Check type="checkbox" label="Design Mobile App" defaultChecked={shopDetail.onboarding?.step_complete.design_mobile_app} disabled={true} />
            <Form.Check type="checkbox" label="Preview Mobile App" defaultChecked={shopDetail.onboarding?.step_complete.preview_mobile_app} disabled={true} />
            <Form.Check type="checkbox" label="App Submission" defaultChecked={shopDetail.onboarding?.step_complete.app_submission} disabled={true} />
          </Col>
        </Row>
      </Form.Group>
      <Button className="me-3" type="submit" variant="success" disabled={submitting}>
        Submit
      </Button>
      <Button type="button" variant="secondary" onClick={() => reset()}>
        Reset
      </Button>
    </Form>
  )
}
