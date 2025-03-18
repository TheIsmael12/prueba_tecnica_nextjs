import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { CreaturesUpdate } from '@/types/creatures';
import { useTranslations } from 'next-intl';


interface CreaturesEditProps {

    creature: CreaturesUpdate
    updateCreatures: (updatedData: CreaturesUpdate) => Promise<boolean>
    loadingUpdate: boolean

}

const CreaturesEdit = ({ creature, updateCreatures, loadingUpdate }: CreaturesEditProps) => {

    const t = useTranslations('CreaturesEdit')

    // Datos iniciales usando la variable desestructurada

    const initialValues: CreaturesUpdate = {

        id: creature.id,
        name: creature.name,
        type: creature.type,
        power_level: creature.power_level,
        trained: creature.trained ? 1 : 0

    }

    const validationSchema = Yup.object({

        name: Yup.string()
            .required(t('obname')),

        type: Yup.string()
            .required(t('obtype')),

        power_level: Yup.number()
            .required(t('oblevel'))
            .min(1, t('min1level'))
            .max(10, t('max10level')),

        trained: Yup.number()
            .required(t('obtrained')),

    })

    const handleSubmit = async (values: CreaturesUpdate) => {

        await updateCreatures(values)

    }

    return (

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >

            {({ setFieldValue }) => (

                <Form className='space-y-4'>

                    <div className='lg:flex gap-10 space-y-4 lg:space-y-0'>

                        <div className='space-y-2 lg:w-1/2'>
                            <label htmlFor='name' className='text-primary'>
                                {t('name')}
                            </label>
                            <Field
                                name='name'
                                className='block w-full mt-2 py-3 px-6 rounded-lg leading-tight bg-gray-100 focus:outline-none focus:border-primary focus:shadow-outline'
                            />
                            <ErrorMessage name='name' component='div' className='text-red-500' />
                        </div>

                        <div className='space-y-2 lg:w-1/2'>
                            <label htmlFor='type' className='text-primary'>
                                {t('type')}
                            </label>
                            <Field
                                name='type'
                                as='select'
                                className='block w-full mt-2 py-3 px-6 rounded-lg leading-tight bg-gray-100 focus:outline-none focus:border-primary focus:shadow-outline'
                            >
                                <option value=''>{t('selecttype')}</option>
                                <option value='Dragón'>{t('dragon')}</option>
                                <option value='Fénix'>{t('fenix')}</option>
                                <option value='Golem'>{t('golem')}</option>
                                <option value='Vampiro'>{t('vampiro')}</option>
                                <option value='Unicornio'>{t('unicornio')}</option>
                            </Field>
                            <ErrorMessage name='type' component='div' className='text-red-500' />
                        </div>

                    </div>

                    <div className='lg:flex gap-10 space-y-4 lg:space-y-0'>

                        <div className='space-y-2 lg:w-1/2'>
                            <label htmlFor='power_level' className='text-primary'>
                                {t('power_level')}
                            </label>
                            <Field
                                name='power_level'
                                type='number'
                                className='block w-full mt-2 py-3 px-6 rounded-lg leading-tight bg-gray-100 focus:outline-none focus:border-primary focus:shadow-outline'
                            />
                            <ErrorMessage name='power_level' component='div' className='text-red-500' />
                        </div>

                        <div className='space-y-2 lg:w-1/2'>
                            <label htmlFor='trained' className='text-primary'>
                                {t('trained')}
                            </label>
                            <div className='flex items-center py-4 space-x-4'>
                                <div className='flex items-center gap-2'>
                                    <Field
                                        name='trained'
                                        type='radio'
                                        value={1}
                                        onChange={() => setFieldValue('trained', 1)}
                                        className='radio-square'
                                    />
                                    <span className='text-lg'>{t('yes')}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Field
                                        name='trained'
                                        type='radio'
                                        value={0}
                                        onChange={() => setFieldValue('trained', 0)}
                                        className='radio-square'
                                    />
                                    <span className='text-lg'>{t('no')}</span>
                                </div>
                            </div>
                            <ErrorMessage name='trained' component='div' className='text-red-500' />
                        </div>

                    </div>

                    <button
                        type='submit'
                        className='bg-primary hover:bg-secondary text-white px-4 py-2 rounded hover:cursor-pointer  w-full lg:w-auto'
                        disabled={loadingUpdate}
                    >
                        {loadingUpdate ? `${t('doingmagic')}` : `${t('updatecreature')}`}
                    </button>

                </Form>

            )}

        </Formik>

    )

}

export default CreaturesEdit